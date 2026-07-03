<script setup lang="ts">
const props = defineProps<{
  audioUrl: string
}>()

const safeAudioUrl = computed(() => getSafeMediaUrl(props.audioUrl));
</script>

<template>
  <div v-if="safeAudioUrl" class="w-full h-16 md:h-24">
    <audio :src="safeAudioUrl" controls class="w-full h-full rounded-lg shadow-md" />
  </div>
</template>
