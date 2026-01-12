<template>
  <div
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface CardDescriptionProps {
  className?: string
}

defineProps<CardDescriptionProps>()
</script>


