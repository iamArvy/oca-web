<script setup lang="ts">

const props = defineProps < {
  link: string
} > ();

const safeEmbedUrl = computed(() => getSafeEmbedUrl(props.link));
</script>

<template>
  <div v-if="safeEmbedUrl" class="w-full h-64 md:h-96">
    <iframe :src="safeEmbedUrl" frameborder="0" allowfullscreen class="w-full h-full rounded-lg shadow-md"
      sandbox="allow-scripts allow-same-origin allow-presentation" referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture" />
  </div>
</template>
