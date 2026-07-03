<script setup lang="ts">
interface Props {
  title: string;
  source: string;
}

const props = defineProps<Props>();
const safeSource = computed(() => getSafeEmbedUrl(props.source));

</script>

<template>
  <div v-if="safeSource" class="h-100 md:h-125 rounded-2xl overflow-hidden">
    <iframe ref="iframeRef" :title="title" :src="safeSource" class="w-full h-full" frameborder="0"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      referrerpolicy="strict-origin-when-cross-origin" allow="picture-in-picture; web-share" allowfullscreen />
  </div>
</template>
