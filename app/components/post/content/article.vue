<script setup lang="ts">
defineProps<{
  htmlContent: string;
}>();
</script>

<template>
  <article class="prose prose-lg max-w-3xl text-foreground prose-a:text-foreground prose-strong:text-foreground ">
    <div v-html="htmlContent" />
  </article>
</template>
