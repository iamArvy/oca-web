<script setup lang="ts">
import { ref, computed } from "vue";
import type { Posts } from "~/interfaces";
import { useIntersectionObserver } from "@vueuse/core";
import list from "./list.vue";
import grid from "./grid.vue";


interface Props {
  posts: Posts;
  loading: boolean;
  title: string;
}

interface Emits {
  (e: "load-more"): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const items = computed(() => useFeedItems(props.posts, 6));

const loadTrigger = ref<HTMLElement | null>(null);
useIntersectionObserver(loadTrigger, (entries) => {
  const entry = entries[0];
  if (entry && entry.isIntersecting) {
    console.log("Intersection detected!");
    emits("load-more");
  }
});

const { mode, setViewMode } = useViewMode();

const components: Record<ViewMode, Component> = {
  [ViewMode.GRID]: grid,
  [ViewMode.LIST]: list,
};

const component = computed(() => {
  return components[mode.value] || grid;
});
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
          size="icon" class="h-8 w-8" @click="setViewMode(item.mode)">
          <component :is="item.icon" class="w-4 h-4" />
        </Button>
      </div>
    </div>

    <ScrollArea class="h-500 pr-5">
      <component :is="component" :items="items" />
      <PostFeedPlaceholder v-if="loading" :mode="mode" class="mt-4" />
      <div ref="loadTrigger" />
    </ScrollArea>
  </div>
</template>
