<template>
  <div
    class="card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em]"
    :class="className"
  >
    <nav
      ref="navRef"
      class="card-nav block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]"
      :class="{ open: isExpanded }"
      :style="{ backgroundColor: baseColor }"
    >
      <div class="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
        <div
          class="hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none"
          :class="{ open: isHamburgerOpen }"
          @click="toggleMenu"
          role="button"
          :aria-label="isExpanded ? 'Close menu' : 'Open menu'"
          tabindex="0"
          :style="{ color: menuColor || '#000' }"
        >
          <div
            class="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] group-hover:opacity-75"
            :class="isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''"
          />
          <div
            class="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] group-hover:opacity-75"
            :class="isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''"
          />
        </div>

        <div class="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
          <img :src="logo" :alt="logoAlt" class="logo h-[28px]" />
        </div>

        <a
          :href="ROUTES.getStarted"
          class="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-colors duration-300 hover:opacity-90"
          :style="{ backgroundColor: buttonBgColor, color: buttonTextColor }"
        >
          Get Started
        </a>
      </div>

      <div
        class="card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] md:flex-row md:items-end md:gap-[12px]"
        :class="isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'"
        :aria-hidden="!isExpanded"
      >
        <div
          v-for="(item, idx) in (items || []).slice(0, 3)"
          :key="`${item.label}-${idx}`"
          class="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
          :ref="(el) => setCardRef(idx, el as HTMLDivElement)"
          :style="{ backgroundColor: item.bgColor, color: item.textColor }"
        >
          <div class="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
            {{ item.label }}
          </div>
          <div class="nav-card-links mt-auto flex flex-col gap-[2px]">
            <a
              v-for="(lnk, i) in item.links"
              :key="`${lnk.label}-${i}`"
              class="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
              :href="lnk.href"
              :aria-label="lnk.ariaLabel"
            >
              <ArrowUpRight class="nav-card-link-icon shrink-0" aria-hidden="true" />
              {{ lnk.label }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-vue-next'
import { ROUTES } from '@/constants'

export type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

interface CardNavProps {
  logo: string
  logoAlt?: string
  items: CardNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
}

const props = withDefaults(defineProps<CardNavProps>(), {
  logoAlt: 'Logo',
  className: '',
  ease: 'power3.out',
  baseColor: '#fff'
})

const isHamburgerOpen = ref(false)
const isExpanded = ref(false)
const navRef = ref<HTMLDivElement | null>(null)
const cardsRef = ref<(HTMLDivElement | null)[]>([])
const tlRef = ref<gsap.core.Timeline | null>(null)

const calculateHeight = () => {
  const navEl = navRef.value
  if (!navEl) return 260

  const isMobile = window.matchMedia('(max-width: 768px)').matches
  if (isMobile) {
    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement
    if (contentEl) {
      const wasVisible = contentEl.style.visibility
      const wasPointerEvents = contentEl.style.pointerEvents
      const wasPosition = contentEl.style.position
      const wasHeight = contentEl.style.height

      contentEl.style.visibility = 'visible'
      contentEl.style.pointerEvents = 'auto'
      contentEl.style.position = 'static'
      contentEl.style.height = 'auto'

      // Force reflow to get accurate scrollHeight
      void contentEl.offsetHeight

      const topBar = 60
      const padding = 16
      const contentHeight = contentEl.scrollHeight

      contentEl.style.visibility = wasVisible
      contentEl.style.pointerEvents = wasPointerEvents
      contentEl.style.position = wasPosition
      contentEl.style.height = wasHeight

      return topBar + contentHeight + padding
    }
  }
  return 260
}

const createTimeline = () => {
  const navEl = navRef.value
  if (!navEl) return null

  gsap.set(navEl, { height: 60, overflow: 'hidden' })
  gsap.set(cardsRef.value.filter(Boolean) as HTMLElement[], { y: 50, opacity: 0 })

  const tl = gsap.timeline({ paused: true })

  tl.to(navEl, {
    height: calculateHeight,
    duration: 0.4,
    ease: props.ease
  })

  tl.to(
    cardsRef.value.filter(Boolean) as HTMLElement[],
    { y: 0, opacity: 1, duration: 0.4, ease: props.ease, stagger: 0.08 },
    '-=0.1'
  )

  return tl
}

const setCardRef = (i: number, el: HTMLDivElement | null) => {
  if (el) cardsRef.value[i] = el
}

const toggleMenu = () => {
  const tl = tlRef.value
  if (!tl) return
  if (!isExpanded.value) {
    isHamburgerOpen.value = true
    isExpanded.value = true
    tl.play(0)
  } else {
    isHamburgerOpen.value = false
    tl.eventCallback('onReverseComplete', () => {
      isExpanded.value = false
    })
    tl.reverse()
  }
}

const handleResize = () => {
  if (!tlRef.value) return

  if (isExpanded.value) {
    const newHeight = calculateHeight()
    if (navRef.value) {
      gsap.set(navRef.value, { height: newHeight })
    }

    tlRef.value.kill()
    const newTl = createTimeline()
    if (newTl) {
      newTl.progress(1)
      tlRef.value = newTl
    }
  } else {
    tlRef.value.kill()
    const newTl = createTimeline()
    if (newTl) {
      tlRef.value = newTl
    }
  }
}

onMounted(() => {
  const tl = createTimeline()
  tlRef.value = tl

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  tlRef.value?.kill()
  window.removeEventListener('resize', handleResize)
})

watch([() => props.ease, () => props.items], () => {
  const tl = createTimeline()
  if (tlRef.value) {
    tlRef.value.kill()
  }
  tlRef.value = tl
})

watch(() => isExpanded.value, () => {
  handleResize()
})
</script>


