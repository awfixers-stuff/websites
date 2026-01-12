import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/ui/button.vue'

describe('Button.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Click me')
  })

  it('renders as button by default', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
  })

  it('renders as anchor when asChild is true', () => {
    const wrapper = mount(Button, {
      props: {
        asChild: true,
      },
      slots: {
        default: 'Link',
      },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  it('applies variant data attribute', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Delete',
      },
    })

    expect(wrapper.attributes('data-variant')).toBe('destructive')
  })

  it('applies size data attribute', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'lg',
      },
      slots: {
        default: 'Large Button',
      },
    })

    expect(wrapper.attributes('data-size')).toBe('lg')
  })

  it('applies className prop', () => {
    const wrapper = mount(Button, {
      props: {
        className: 'custom-class',
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.classes()).toContain('custom-class')
  })

  it('handles click events', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.exists()).toBe(true)
  })
})

