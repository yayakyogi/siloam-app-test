<script setup lang="ts">
  defineProps<{title: string}>()
</script>

<template>
  <div class="px-4 py-5 shadow flex justify-between items-center sticky top-0 bg-white z-10">
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <slot></slot>
  </div>
</template>