import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { ROUTES } from '@/constants'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.home,
      name: 'Home',
      component: defineAsyncComponent(() => import('@/pages/Home.vue'))
    },
    {
      path: ROUTES.contact,
      name: 'Contact',
      component: defineAsyncComponent(() => import('@/pages/Contact.vue'))
    },
    {
      path: ROUTES.about,
      name: 'About',
      component: defineAsyncComponent(() => import('@/pages/About.vue'))
    },
    {
      path: ROUTES.privacy,
      name: 'Privacy',
      component: defineAsyncComponent(() => import('@/pages/Privacy.vue'))
    },
    {
      path: ROUTES.terms,
      name: 'Terms',
      component: defineAsyncComponent(() => import('@/pages/Terms.vue'))
    },
    {
      path: ROUTES.signIn,
      name: 'SignIn',
      component: defineAsyncComponent(() => import('@/pages/SignIn.vue'))
    }
  ]
})

export default router


