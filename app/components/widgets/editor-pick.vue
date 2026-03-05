<script setup lang="ts">
import { Award } from 'lucide-vue-next';
import type { ApiListResponse, Posts } from '~/interfaces';
const { data: editorPicks } = useAPI<ApiListResponse<Posts>>("/posts", { query: { collection: 'editor-picks', limit: 5 } })
</script>

<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h3 class="font-display text-lg font-bold mb-4 flex items-center gap-2">
      <Award class="w-5 h-5 text-primary" />
      Editor's Picks
    </h3>
    <div class="space-y-1">
      <PostCard v-for="post in editorPicks?.data" :key="post.id" :post="post" variant="compact" />
    </div>
  </div>
</template>