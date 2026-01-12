<template>
  <component
    :is="tag"
    ref="textRef"
    :style="{
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    }"
    :class="['split-parent', 'overflow-hidden', 'inline-block', 'whitespace-normal', className]"
  >
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  onLetterAnimationComplete?: () => void
}

const props = withDefaults(defineProps<SplitTextProps>(), {
  className: '',
  delay: 50,
  duration: 1.25,
  ease: 'power3.out',
  splitType: 'chars',
  from: () => ({ opacity: 0, y: 40 }),
  to: () => ({ opacity: 1, y: 0 }),
  threshold: 0.1,
  rootMargin: '-100px',
  tag: 'p',
  textAlign: 'center'
})

const emit = defineEmits<{
  letterAnimationComplete: []
}>()

const textRef = ref<HTMLElement | null>(null)
const fontsLoaded = ref(false)
const animationCompleted = ref(false)
let splitInstance: GSAPSplitText | null = null
let animation: gsap.core.Tween | null = null

const initAnimation = () => {
  if (!textRef.value || !props.text || !fontsLoaded.value || animationCompleted.value) return

  const el = textRef.value as HTMLElement & {
    _rbsplitInstance?: GSAPSplitText
  }

  if (el._rbsplitInstance) {
    try {
      el._rbsplitInstance.revert()
    } catch {
      // Ignore revert errors
    }
    el._rbsplitInstance = undefined
  }

  const startPct = (1 - props.threshold) * 100
  const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(props.rootMargin)
  const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
  const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px'
  const sign =
    marginValue === 0
      ? ''
      : marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`
  const start = `top ${startPct}%${sign}`

  let targets: Element[] = []
  const assignTargets = (self: GSAPSplitText) => {
    if (props.splitType.includes('chars') && self.chars?.length)
      targets = self.chars
    if (!targets.length && props.splitType.includes('words') && self.words.length) 
      targets = self.words
    if (!targets.length && props.splitType.includes('lines') && self.lines.length) 
      targets = self.lines
    if (!targets.length) 
      targets = self.chars || self.words || self.lines
  }

  splitInstance = new GSAPSplitText(el, {
    type: props.splitType,
    smartWrap: true,
    autoSplit: props.splitType === 'lines',
    linesClass: 'split-line',
    wordsClass: 'split-word',
    charsClass: 'split-char',
    reduceWhiteSpace: false,
    onSplit: (self: GSAPSplitText) => {
      assignTargets(self)
      animation = gsap.fromTo(
        targets,
        { ...props.from },
        {
          ...props.to,
          duration: props.duration,
          ease: props.ease,
          stagger: props.delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            animationCompleted.value = true
            emit('letterAnimationComplete')
            props.onLetterAnimationComplete?.()
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      )
      return animation
    }
  })
  el._rbsplitInstance = splitInstance
}

const cleanup = () => {
  if (textRef.value) {
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === textRef.value) st.kill()
    })
  }
  if (animation) {
    animation.kill()
    animation = null
  }
  if (splitInstance) {
    try {
      splitInstance.revert()
    } catch {
      // Ignore revert errors
    }
    splitInstance = null
  }
  if (textRef.value) {
    const el = textRef.value as HTMLElement & {
      _rbsplitInstance?: GSAPSplitText
    }
    el._rbsplitInstance = undefined
  }
}

onMounted(() => {
  if (document.fonts.status === 'loaded') {
    fontsLoaded.value = true
  } else {
    document.fonts.ready.then(() => {
      fontsLoaded.value = true
    })
  }
})

watch([() => props.text, () => fontsLoaded.value, () => props.delay, () => props.duration, () => props.ease, () => props.splitType, () => props.threshold, () => props.rootMargin], () => {
  cleanup()
  if (fontsLoaded.value && props.text) {
    setTimeout(() => {
      initAnimation()
    }, 0)
  }
}, { immediate: true })

onUnmounted(() => {
  cleanup()
})
</script>


