<script setup lang="ts">
import { Award } from 'lucide-vue-next';
import { API_ROUTES } from '~/constants';
import type { ApiListResponse, Post } from '~/interfaces';

const collection = 'editor-picks'
const { data: editorPicks } = useAPI<ApiListResponse<Post>>(API_ROUTES.posts.path, { query: { collection, limit: 4 } })
</script>

<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h2 class="font-display text-lg font-bold mb-4 flex items-center gap-2">
      <Award class="w-5 h-5 text-primary" />
      Editor's Picks
    </h2>
    <div class="space-y-1">
      <PostCard v-for="post in editorPicks?.data" :key="post.id" :post="post" />
    </div>
  </div>
</template>