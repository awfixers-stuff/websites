<template>
  <p ref="textRef" :class="['blur-text', className, 'flex flex-wrap']">
    <span
      v-for="(segment, index) in elements"
      :key="index"
      ref="segmentRefs"
      :style="{
        display: 'inline-block',
        willChange: 'transform, filter, opacity'
      }"
    >
      {{ segment === ' ' ? '\u00A0' : segment }}
      <template v-if="animateBy === 'words' && index < elements.length - 1">\u00A0</template>
    </span>
  </p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'

interface BlurTextProps {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: string | ((t: number) => number)
  onAnimationComplete?: () => void
  stepDuration?: number
}

const props = withDefaults(defineProps<BlurTextProps>(), {
  text: '',
  delay: 200,
  className: '',
  animateBy: 'words',
  direction: 'top',
  threshold: 0.1,
  rootMargin: '0px',
  easing: 'power2.out',
  stepDuration: 0.35
})

const emit = defineEmits<{
  animationComplete: []
}>()

const textRef = ref<HTMLParagraphElement | null>(null)
const segmentRefs = ref<HTMLElement[]>([])
const inView = ref(false)
let observer: IntersectionObserver | null = null

const elements = computed(() => props.animateBy === 'words' ? props.text.split(' ') : props.text.split(''))

const defaultFrom = computed(() =>
  props.direction === 'top' 
    ? { filter: 'blur(10px)', opacity: 0, y: -50 } 
    : { filter: 'blur(10px)', opacity: 0, y: 50 }
)

const defaultTo = computed(() => [
  {
    filter: 'blur(5px)',
    opacity: 0.5,
    y: props.direction === 'top' ? 5 : -5
  },
  { filter: 'blur(0px)', opacity: 1, y: 0 }
])

const fromSnapshot = computed(() => props.animationFrom ?? defaultFrom.value)
const toSnapshots = computed(() => props.animationTo ?? defaultTo.value)

const stepCount = computed(() => toSnapshots.value.length + 1)

onMounted(() => {
  if (!textRef.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true
        observer?.unobserve(textRef.value as Element)
      }
    },
    { threshold: props.threshold, rootMargin: props.rootMargin }
  )
  observer.observe(textRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})

watch([inView, () => segmentRefs.value], () => {
  if (!inView.value || segmentRefs.value.length === 0) return

  segmentRefs.value.forEach((segment, index) => {
    const keyframes = [fromSnapshot.value, ...toSnapshots.value]
    const times = Array.from({ length: stepCount.value }, (_, i) => 
      stepCount.value === 1 ? 0 : i / (stepCount.value - 1)
    )

    const timeline = gsap.timeline({
      delay: (index * props.delay) / 1000,
      onComplete: index === elements.value.length - 1 ? () => {
        emit('animationComplete')
        props.onAnimationComplete?.()
      } : undefined
    })

    keyframes.forEach((keyframe, i) => {
      if (i === 0) {
        gsap.set(segment, keyframe)
      } else {
        timeline.to(segment, {
          ...keyframe,
          duration: props.stepDuration,
          ease: props.easing
        }, times[i])
      }
    })
  })
}, { immediate: true })
</script>


