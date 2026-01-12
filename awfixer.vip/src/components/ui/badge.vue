<template>
  <component
    :is="asChild ? 'slot' : 'span'"
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), className)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { badgeVariants } from './badge.variants'

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  asChild?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  asChild: false
})
</script>

