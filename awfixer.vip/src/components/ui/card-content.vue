<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface CardContentProps {
  className?: string
}

defineProps<CardContentProps>()
</script>


