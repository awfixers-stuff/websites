import { mount, type MountingOptions } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'

/**
 * Helper function to mount components with router
 */
export function mountWithRouter(
  component: Component,
  options: MountingOptions<any> = {}
) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/about', component: { template: '<div>About</div>' } },
    ],
  })

  return mount(component, {
    global: {
      plugins: [router],
      ...options.global,
    },
    ...options,
  })
}

/**
 * Helper to wait for next tick
 */
export function nextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

/**
 * Helper to create mouse event
 */
export function createMouseEvent(
  type: string,
  options: MouseEventInit = {}
): MouseEvent {
  return new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    ...options,
  })
}

/**
 * Helper to wait for animations/transitions
 */
export function waitForAnimation(delay = 100) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

