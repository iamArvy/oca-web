<script setup lang="ts">
interface Props {
  source: string;
}

const props = defineProps<Props>();

const iframeRef = ref<HTMLIFrameElement | null>(null);
const isPlaying = ref(false);

function toggleVideo() {
  if (!iframeRef.value) return;

  const command = isPlaying.value ? "pauseVideo" : "playVideo";

  iframeRef.value.contentWindow?.postMessage(
    JSON.stringify({
      event: "command",
      func: command,
      args: "",
    }),
    "*"
  );

  isPlaying.value = !isPlaying.value;
}
</script>

<template>
  <div @click="toggleVideo" class="h-100 md:h-125 rounded-2xl overflow-hidden">
    <iframe ref="iframeRef" :src="`${source}&controls=0`" class="w-full h-full" frameborder="0" allow="encrypted-media"
      allowfullscreen />
  </div>
</template>
