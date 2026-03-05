<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { ApiListResponse, Posts } from '~/interfaces';
import { Flame } from 'lucide-vue-next';

const { data: hotClicks } = useAPI<ApiListResponse<Posts>>("/posts", { query: { collection: 'hot-clicks', limit: 5 } })
</script>
<template>
  <div class="bg-card rounded-2xl p-6 card-interactive border-l-4 border-l-primary">
    <h3 class="font-display text-lg font-bold mb-4 flex items-center gap-2">
      <Flame class="w-5 h-5 text-primary" />
      Hot Clicks
    </h3>
    <div class="space-y-3">
      <NuxtLink v-for="(post, index) in hotClicks?.data" :key="post.id" :to="APP_ROUTES.post.path(post.slug)"
        class="flex items-start gap-3 group">
        <span class="text-2xl font-display font-bold text-primary/30 group-hover:text-primary transition-colors">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <div>
          <p class="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {{ post.title }}
          </p>
          <p class="text-xs text-muted-foreground mt-0.5">{{ post.topic.name }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>