<script setup lang="ts">
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, PostWebsiteListData } from "~/types";

import { computed } from "vue";
import basic from "./basic.vue";
import base from "./default.vue";

import { Plus } from "lucide-vue-next";

interface Props {
  query: Record<string, any>;
  title: string;
}

const props = defineProps<Props>();


const query = computed(() => ({
  ...props.query,
  limit: 18,
}));

const { data } = await useAPI<ApiListResponse<PostWebsiteListData>>(API_ROUTES.public.posts, {
  query,
});

const {
  items: posts,
  hasNextPage,
  loadMore,
  loading,
  loadTrigger
} = usePagination<PostWebsiteListData>({
  route: API_ROUTES.public.posts,
  initialItems: data,
  query,
});
const items = computed(() => useFeedItems<PostWebsiteListData>(posts.value, 12));

const { mode, setViewMode } = useViewMode();

const components: Record<ViewMode, Component> = {
  [ViewMode.DEFAULT]: base,
  [ViewMode.BASIC]: basic,
};

const component = computed(() => {
  return components[mode.value] || base;
});

const { isMobile } = useMobile('lg')
</script>

<template>
  <div>
    <div class="flex items-center">
      <div class="flex-1 mb-6 relative">
        <h2 class="font-display text-2xl md:text-3xl font-bold ">{{ title }}</h2>
        <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
      </div>
      <div class="flex items-center justify-end gap-1 mb-4">
        <Button v-for="item in ViewModeItems" :key="item.mode" :variant="item.mode === mode ? 'default' : 'ghost'"
          size="icon" class="h-8 w-8" @click="setViewMode(item.mode)" :aria-label="`toggle-view-${item.mode}`">
          <component :is="item.icon" class="w-4 h-4" />
        </Button>
      </div>
    </div>

    <component :is="component" :items="items" />
    <PostFeedPlaceholder v-if="loading" :mode="mode" class="mt-4" />
    <div v-if="!isMobile" ref="loadTrigger" class="h-10" />
    <template v-else>
      <div v-if="!loading && hasNextPage" class="flex items-center justify-center mt-4">
        <Button variant="outline" @click="loadMore">
          <Plus />
          Load More
        </Button>
      </div>
    </template>
  </div>
</template>
