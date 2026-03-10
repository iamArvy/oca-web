<script setup lang="ts">
import { ref, computed } from "vue";
import { LayoutGrid, List } from "lucide-vue-next";
import type { Posts } from "~/interfaces";
import { useIntersectionObserver } from "@vueuse/core";

enum ViewMode {
  GRID = "grid",
  LIST = "list",
}

interface Props {
  posts: Posts;
  columns?: 3 | 4;
  showViewToggle?: boolean;
  loading: boolean
}

interface Emits {
  (e: "load-more"): void;
}

const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  showViewToggle: true,
});

const viewMode = useState<ViewMode>(() => ViewMode.GRID);

/**
 * Define grid columns dynamically.
 */
const gridCols = computed(() =>
  props.columns === 3
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
);

const items = computed(() => useFeedItems(props.posts, 6));

const loadTrigger = ref<HTMLElement | null>(null);
useIntersectionObserver(loadTrigger, (entries) => {
  const entry = entries[0];
  if (entry && entry.isIntersecting) {
    emits("load-more");
  }
});
</script>

<template>
  <div>
    <!-- View Toggle -->
    <div v-if="props.showViewToggle" class="flex items-center justify-end gap-1 mb-4">
      <Button :variant="viewMode === ViewMode.GRID ? 'default' : 'ghost'" size="icon" class="h-8 w-8"
        @click="viewMode = ViewMode.GRID">
        <LayoutGrid class="w-4 h-4" />
      </Button>

      <Button :variant="viewMode === ViewMode.LIST ? 'default' : 'ghost'" size="icon" class="h-8 w-8"
        @click="viewMode = ViewMode.LIST">
        <List class="w-4 h-4" />
      </Button>
    </div>
    <ScrollArea class="h-500 px-5">
      <PostFeedGrid v-if="viewMode === 'grid'" :items="items" />
      <PostFeedList v-else :items="items" />
      <div ref="loadTrigger" class="h-10">
        <div v-if="loading" class="text-center flex items-center justify-center py-6 text-muted-foreground">
          <Spinner />
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
