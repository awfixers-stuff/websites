<template>
  <div
    data-slot="resizable-panel-group"
    :class="cn(
      'flex h-full w-full',
      direction === 'vertical' ? 'flex-col' : '',
      className
    )"
    :data-panel-group-direction="direction"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface ResizablePanelGroupProps {
  className?: string
  direction?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<ResizablePanelGroupProps>(), {
  direction: 'horizontal'
})
</script>


