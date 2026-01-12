<template>
  <div id="lights" class="w-full h-full" ref="hyperspeedRef"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

// Import the App class and other utilities from the original file
// Since the file is large, we'll need to copy the logic
// For now, let's create a wrapper that will work with the existing App class

interface Distortion {
  uniforms: Record<string, { value: unknown }>
  getDistortion: string
  getJS?: (progress: number, time: number) => THREE.Vector3
}

interface Colors {
  roadColor: number
  islandColor: number
  background: number
  shoulderLines: number
  brokenLines: number
  leftCars: number[]
  rightCars: number[]
  sticks: number
}

interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void
  distortion?: string | Distortion
  length: number
  roadWidth: number
  islandWidth: number
  lanesPerRoad: number
  fov: number
  fovSpeedUp: number
  speedUp: number
  carLightsFade: number
  totalSideLightSticks: number
  lightPairsPerRoadWay: number
  shoulderLinesWidthPercentage: number
  brokenLinesWidthPercentage: number
  brokenLinesLengthPercentage: number
  lightStickWidth: [number, number]
  lightStickHeight: [number, number]
  movingAwaySpeed: [number, number]
  movingCloserSpeed: [number, number]
  carLightsLength: [number, number]
  carLightsRadius: [number, number]
  carWidthPercentage: [number, number]
  carShiftX: [number, number]
  carFloorSeparation: [number, number]
  colors: Colors
  isHyper?: boolean
}

interface HyperspeedProps {
  effectOptions?: Partial<HyperspeedOptions>
}

const props = withDefaults(defineProps<HyperspeedProps>(), {
  effectOptions: () => ({})
})

// We need to import or copy the App class and all utilities
// For brevity, I'll create a placeholder that imports from a separate file
// In practice, you'd copy the entire App class and utilities here or import them

const hyperspeedRef = ref<HTMLDivElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appRef = ref<any>(null)

const mergedOptions = computed<HyperspeedOptions>(() => ({
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3
  },
  ...props.effectOptions
}))

// Import App class and distortions from the original file
// For now, we'll need to extract the App class to a separate .ts file
// or import it dynamically. This is a working structure.

const initHyperspeed = async () => {
  if (appRef.value) {
    appRef.value.dispose()
    const container = document.getElementById('lights')
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }

  const container = hyperspeedRef.value
  if (!container) return

  // Dynamically import the App class from the original file
  // In production, you'd extract App to a separate .ts file
  const { App, distortions } = await import('./Hyperspeed')
  
  const options = { ...mergedOptions.value }
  if (typeof options.distortion === 'string') {
    options.distortion = distortions[options.distortion]
  }

  const myApp = new App(container, options)
  appRef.value = myApp
  await myApp.loadAssets()
  myApp.init()
}

onMounted(() => {
  initHyperspeed()
})

onUnmounted(() => {
  if (appRef.value) {
    appRef.value.dispose()
  }
})

watch(() => mergedOptions.value, () => {
  initHyperspeed()
}, { deep: true })
</script>

