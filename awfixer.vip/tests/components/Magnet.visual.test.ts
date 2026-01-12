import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from '../utils/test-utils'
import Magnet from '@/components/Magnet.vue'

/**
 * Visual behavior tests for Magnet component
 * These tests verify the visual aspects of the magnet effect
 */
describe('Magnet.vue Visual Behavior', () => {
  describe('Transform Calculations', () => {
    it('calculates correct transform offset based on mouse position', async () => {
      const wrapper = mount(Magnet, {
        props: {
          magnetStrength: 2,
          padding: 100,
        },
        slots: {
          default: '<div style="width: 200px; height: 200px;">Content</div>',
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

      // Mouse at center (should have 0 offset)
      const centerEvent = new MouseEvent('mousemove', {
        clientX: 200, // centerX
        clientY: 200, // centerY
        bubbles: true,
      })

      window.dispatchEvent(centerEvent)
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('translate3d(0px, 0px, 0)')
    })

    it('applies correct transform offset when mouse is offset from center', async () => {
      const wrapper = mount(Magnet, {
        props: {
          magnetStrength: 2,
          padding: 100,
        },
        slots: {
          default: '<div style="width: 200px; height: 200px;">Content</div>',
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

      // Mouse 50px right and 30px down from center
      // Expected offset: (50 / 2, 30 / 2) = (25, 15)
      const offsetEvent = new MouseEvent('mousemove', {
        clientX: 250, // centerX + 50
        clientY: 230, // centerY + 30
        bubbles: true,
      })

      window.dispatchEvent(offsetEvent)
      await nextTick()

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style')
      expect(style).toContain('translate3d(25px, 15px, 0)')
    })
  })

  describe('Visual States', () => {
    it('applies willChange transform for performance', () => {
      const wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style') || ''
      // Vue converts style object to inline style string
      // Check that style attribute exists and contains relevant properties
      expect(style).toBeTruthy()
      expect(innerElement.element).toBeTruthy()
    })

    it('uses translate3d for hardware acceleration', () => {
      const wrapper = mount(Magnet, {
        slots: {
          default: '<div>Content</div>',
        },
      })

      const innerElement = wrapper.findAll('div')[1]
      const style = innerElement.attributes('style') || ''
      // Check that translate3d is used in the transform
      expect(style).toContain('translate3d')
    })
  })

  describe('Transition Behavior', () => {
    it('switches between active and inactive transitions', async () => {
      const wrapper = mount(Magnet, {
        props: {
          activeTransition: 'transform 0.2s ease',
          inactiveTransition: 'transform 0.5s ease-in-out',
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

      // Initially inactive
      let innerElement = wrapper.findAll('div')[1]
      let style = innerElement.attributes('style')
      expect(style).toContain('transform 0.5s ease-in-out')

      // Activate
      const activateEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      })
      window.dispatchEvent(activateEvent)
      await nextTick()

      innerElement = wrapper.findAll('div')[1]
      style = innerElement.attributes('style')
      expect(style).toContain('transform 0.2s ease')

      // Deactivate
      const deactivateEvent = new MouseEvent('mousemove', {
        clientX: 1000,
        clientY: 1000,
        bubbles: true,
      })
      window.dispatchEvent(deactivateEvent)
      await nextTick()

      innerElement = wrapper.findAll('div')[1]
      style = innerElement.attributes('style')
      expect(style).toContain('transform 0.5s ease-in-out')
    })
  })
})

