<script setup lang="ts">
import { computed } from "vue";
import type { ApiListResponse, TopicPosts } from "~/interfaces";

interface Props {
  route: string;
  query?: Record<string, any>;
}

const props = defineProps<Props>();

const query = computed(() => ({
  ...props.query,
  limit: 3,
  postLimit: 4,
}));

const { data } = await useAPI<ApiListResponse<TopicPosts>>(props.route, {
  query: query.value,
});

const {
  items: topics,
  hasNextPage,
  loading,
  loadTrigger
} = usePagination<TopicPosts>({
  route: props.route,
  initialItems: data,
  query: query.value,
});

const items = computed(() => useFeedItems<TopicPosts>(topics.value, 3));
</script>

<template>
  <div>
    <template v-for="(item, index) in items" :key="index">
      <TopicFeedItem v-if="item.type === 'item' && item.item" v-bind="item.item" />

      <div v-else class="md:col-span-2 lg:col-span-3">
        <AdComponent size="banner" />
      </div>
    </template>
    <TopicFeedPlaceholder v-if="loading" class="mt-4" />
    <div v-if="hasNextPage" ref="loadTrigger" class="h-10" />
  </div>
</template>
