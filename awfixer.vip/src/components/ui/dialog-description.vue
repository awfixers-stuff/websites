<template>
  <DialogDescription
    data-slot="dialog-description"
    :class="cn('text-muted-foreground text-sm', className)"
    v-bind="$attrs"
  >
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
import { DialogDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

interface DialogDescriptionProps {
  className?: string
}

defineProps<DialogDescriptionProps>()
</script>


