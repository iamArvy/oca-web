<script setup lang="ts">
import type { Posts } from '~/interfaces';


const { data: posts } = useFetch<Posts>('/api/posts', {
  cache: "no-cache",
  query: {
    trending: true,
    limit: 5,
  }
})
</script>
<template>
  <div v-if="posts" class="bg-card rounded-2xl p-6 card-interactive">
    <h3 class="font-display text-lg font-bold mb-4">Popular Posts</h3>
    <div class="space-y-1">
      <PostCard v-for="post in posts" :key="post.id" :post="post" variant="compact" />
    </div>
  </div>
</template>