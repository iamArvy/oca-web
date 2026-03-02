<script setup lang="ts">
defineProps<{
  htmlContent: string;
}>();
</script>

<template>
  <article class="prose prose-lg max-w-none">
    <div v-html="htmlContent" />
  </article>
</template>
