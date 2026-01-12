<template>
  <DialogRoot data-slot="dialog" v-bind="$attrs">
    <slot />
  </DialogRoot>
</template>

<script setup lang="ts">
import { DialogRoot } from 'reka-ui'
</script>


