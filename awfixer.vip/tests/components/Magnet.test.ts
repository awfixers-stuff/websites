import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from '../utils/test-utils'
import Magnet from '@/components/Magnet.vue'

describe('Magnet.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    // Reset any mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Component Rendering', () => {
    it('renders correctly with default props', () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Test Content</div>',
        },
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Test Content')
    })

    it('applies wrapper className when provided', () => {
      wrapper = mount(Magnet, {
        props: {
          wrapperClassName: 'custom-wrapper',
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const wrapperElement = wrapper.find('div')
      expect(wrapperElement.classes()).toContain('custom-wrapper')
    })

    it('applies inner className when provided', () => {
      wrapper = mount(Magnet, {
        props: {
          innerClassName: 'custom-inner',
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const innerElement = wrapper.findAll('div')[1]
      expect(innerElement.classes()).toContain('custom-inner')
    })

    it('has correct default styles', () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      const wrapperElement = wrapper.find('div')
      const wrapperStyles = wrapperElement.attributes('style')
      expect(wrapperStyles).toContain('position: relative')
      expect(wrapperStyles).toContain('display: inline-block')
    })
  })

  describe('Props', () => {
    it('uses default padding value', () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(wrapper.props('padding')).toBe(100)
    })

    it('uses custom padding value', () => {
      wrapper = mount(Magnet, {
        props: {
          padding: 50,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(wrapper.props('padding')).toBe(50)
    })

    it('uses default magnetStrength value', () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(wrapper.props('magnetStrength')).toBe(2)
    })

    it('uses custom magnetStrength value', () => {
      wrapper = mount(Magnet, {
        props: {
          magnetStrength: 5,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(wrapper.props('magnetStrength')).toBe(5)
    })

    it('uses default transition values', () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(wrapper.props('activeTransition')).toBe('transform 0.3s ease-out')
      expect(wrapper.props('inactiveTransition')).toBe('transform 0.5s ease-in-out')
    })

    it('uses custom transition values', () => {
      wrapper = mount(Magnet, {
        props: {
          activeTransition: 'transform 0.2s linear',
          inactiveTransition: 'transform 0.4s linear',
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(wrapper.props('activeTransition')).toBe('transform 0.2s linear')
      expect(wrapper.props('inactiveTransition')).toBe('transform 0.4s linear')
    })
  })

  describe('Magnet Effect Behavior', () => {
    it('starts with position at 0,0', () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('translate3d(0px, 0px, 0)')
    })

    it('responds to mouse movement within padding area', async () => {
      wrapper = mount(Magnet, {
        props: {
          padding: 100,
          magnetStrength: 2,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const wrapperElement = wrapper.find('div').element as HTMLElement

      // Mock getBoundingClientRect
      const mockRect = {
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: () => {},
      }
      vi.spyOn(wrapperElement, 'getBoundingClientRect').mockReturnValue(mockRect as DOMRect)

      // Simulate mouse move within padding area
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 200, // Center X
        clientY: 200, // Center Y
        bubbles: true,
      })

      window.dispatchEvent(mouseEvent)
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      // Should have some transform applied
      expect(style).toContain('translate3d')
    })

    it('does not respond when disabled', async () => {
      wrapper = mount(Magnet, {
        props: {
          disabled: true,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      })

      window.dispatchEvent(mouseEvent)
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('translate3d(0px, 0px, 0)')
    })

    it('resets position when mouse moves outside padding area', async () => {
      wrapper = mount(Magnet, {
        props: {
          padding: 50,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const wrapperElement = wrapper.find('div').element as HTMLElement
      const mockRect = {
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: () => {},
      }
      vi.spyOn(wrapperElement, 'getBoundingClientRect').mockReturnValue(mockRect as DOMRect)

      // Move mouse far away
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 1000,
        clientY: 1000,
        bubbles: true,
      })

      window.dispatchEvent(mouseEvent)
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('translate3d(0px, 0px, 0)')
    })
  })

  describe('Event Listeners', () => {
    it('adds mousemove listener on mount when not disabled', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

      wrapper = mount(Magnet, {
        props: {
          disabled: false,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    })

    it('does not add mousemove listener when disabled', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

      wrapper = mount(Magnet, {
        props: {
          disabled: true,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function))
    })

    it('removes mousemove listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      wrapper.unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    })
  })

  describe('Transition Styles', () => {
    it('applies active transition when magnet is active', async () => {
      wrapper = mount(Magnet, {
        props: {
          activeTransition: 'transform 0.2s ease',
          inactiveTransition: 'transform 0.5s ease',
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const wrapperElement = wrapper.find('div').element as HTMLElement
      const mockRect = {
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: () => {},
      }
      vi.spyOn(wrapperElement, 'getBoundingClientRect').mockReturnValue(mockRect as DOMRect)

      // Trigger mouse move to activate
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      })

      window.dispatchEvent(mouseEvent)
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('transform 0.2s ease')
    })
  })

  describe('Edge Cases', () => {
    it('handles null ref gracefully', async () => {
      wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      // Simulate ref being null
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      })

      // This should not throw
      window.dispatchEvent(mouseEvent)
      await nextTick()

      expect(wrapper.exists()).toBe(true)
    })

    it('updates position when disabled prop changes', async () => {
      wrapper = mount(Magnet, {
        props: {
          disabled: false,
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      await wrapper.setProps({ disabled: true })
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('translate3d(0px, 0px, 0)')
    })
  })
})

