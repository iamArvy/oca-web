<script setup lang="ts">
interface Props {
  name: string;
  postCount: number;
}

defineProps<Props>();
</script>

<template>
  <div class="mb-8">
    <h1 class="font-display text-4xl md:text-5xl font-bold mb-2">
      {{ name }}
    </h1>
    <p class="text-muted-foreground">
      {{ postCount }} articles in this category
    </p>
  </div>
</template>