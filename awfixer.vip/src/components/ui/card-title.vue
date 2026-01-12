<template>
  <div
    data-slot="card-title"
    :class="cn('leading-none font-semibold', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface CardTitleProps {
  className?: string
}

defineProps<CardTitleProps>()
</script>


