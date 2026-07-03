<script setup lang="ts">
import { API_ROUTES } from '~/constants';
import { type ApiListResponse, type PostWebsiteListData } from '~/types';
import { Flame } from '@lucide/vue';

interface Props {
  topic?: string;
}

const props = defineProps<Props>();

const { data: hotClicks } = useAPI<ApiListResponse<PostWebsiteListData>>(API_ROUTES.public.widgets.hotClicks, { query: { topic: props.topic } })
</script>
<template>
  <div v-if="hotClicks?.data && hotClicks.data.length > 0"
    class="bg-card rounded-2xl p-6 card-interactive border-l-4 border-l-primary">
    <h2 class="font-display text-lg font-bold mb-4 flex items-center gap-2">
      <Flame class="w-5 h-5 text-primary" />
      Hot Clicks
    </h2>
    <div class="space-y-1">
      <PostCard v-for="post in hotClicks?.data" :key="post.id" :post="post" />
    </div>
  </div>
</template>