<script setup lang="ts">
const props = defineProps<{
  htmlContent: string;
}>();

const sanitizedHtml = computed(() => sanitizeContentHtml(props.htmlContent));
</script>

<template>
  <article class="prose prose-lg max-w-3xl text-foreground prose-a:text-foreground prose-strong:text-foreground prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-img:mx-auto  [&_img]:max-w-full
         [&_img]:h-auto
         [&_img]:object-contain">
    <div v-html="sanitizedHtml" />
  </article>
</template>
