<script setup lang="ts">
import type { Posts } from '~/interfaces';

interface Props {
  posts: Posts,
  title: string
}

defineProps<Props>()
</script>
<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h3 class="font-display text-lg font-bold mb-4">{{ title }}</h3>
    <div class="space-y-1">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>