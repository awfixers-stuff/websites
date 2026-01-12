<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    :class="cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      className
    )"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { DialogOverlay } from 'reka-ui'
import { cn } from '@/lib/utils'

interface DialogOverlayProps {
  className?: string
}

defineProps<DialogOverlayProps>()
</script>


