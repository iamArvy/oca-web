<script setup lang="ts">
defineProps<{
  audioUrl: string
}>()
</script>

<template>
  <div class="w-full h-16 md:h-24">
    <audio :src="audioUrl" controls class="w-full h-full rounded-lg shadow-md" />
  </div>
</template>