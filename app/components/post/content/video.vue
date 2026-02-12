<script setup lang="ts">
defineProps<{
  videoUrl: string
}>()
</script>

<template>
  <div class="w-full h-64 md:h-96">
    <video :src="videoUrl" controls class="w-full h-full rounded-lg shadow-md" />
  </div>
</template>