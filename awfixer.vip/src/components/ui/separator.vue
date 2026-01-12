<template>
  <Separator
    data-slot="separator"
    :decorative="decorative"
    :orientation="orientation"
    :class="cn(
      'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      className
    )"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { Separator } from 'reka-ui'
import { cn } from '@/lib/utils'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  className?: string
}

withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true
})
</script>


