<script setup lang="ts">
import { ref, computed } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

interface Props {
  route: string;
  query: Record<string, any>;
}

const props = defineProps<Props>();

const { loading, topics, loadMore } = useTopicFeed(props.route, props.query);
const items = computed(() => useTopicFeedItems(topics.value ?? []));

const loadTrigger = ref<HTMLElement | null>(null);
useIntersectionObserver(loadTrigger, (entries) => {
  const entry = entries[0];
  if (entry && entry.isIntersecting) {
    loadMore()
  }
});
</script>

<template>
  <div>
    <template v-for="(item, index) in items" :key="index">
      <TopicFeedItem v-if="item.type === 'topic' && item.topic" v-bind="item.topic" />

      <div v-else class="md:col-span-2 lg:col-span-3">
        <AdComponent size="inline" />
      </div>
    </template>
    <!-- <TopicFeedPlaceholder v-if="loading" :mode="mode" class="mt-4" /> -->
    <div ref="loadTrigger" class="h-10" />
  </div>
</template>
