<script setup lang="ts">
import { API_ROUTES, APP_ROUTES } from '~/constants';
import { SortPostOptions, type ApiListResponse, type Posts } from '~/interfaces';
import { Flame } from 'lucide-vue-next';

const collection = 'hot-clicks'
const { data: hotClicks } = useAPI<ApiListResponse<Posts>>(API_ROUTES.posts.path, { query: { sort: SortPostOptions.VIEWS, days: 1, limit: 4 } })
</script>
<template>
  <div class="bg-card rounded-2xl p-6 card-interactive border-l-4 border-l-primary">
    <h3 class="font-display text-lg font-bold mb-4 flex items-center gap-2">
      <Flame class="w-5 h-5 text-primary" />
      <NuxtLink :to="APP_ROUTES.collection.path(collection)">
        Hot Clicks
      </NuxtLink>
    </h3>
    <div class="space-y-1">
      <PostCard v-for="post in hotClicks?.data" :key="post.id" :post="post" variant="compact" />
    </div>
  </div>
</template>