<template>
  <Separator
    data-slot="resizable-handle"
    :class="cn(
      'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className
    )"
    v-bind="$attrs"
  >
    <div v-if="withHandle" class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
      <GripVerticalIcon class="size-2.5" />
    </div>
  </Separator>
</template>

<script setup lang="ts">
import { Separator } from 'reka-ui'
import { GripVerticalIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface ResizableHandleProps {
  withHandle?: boolean
  className?: string
}

withDefaults(defineProps<ResizableHandleProps>(), {
  withHandle: false
})
</script>

