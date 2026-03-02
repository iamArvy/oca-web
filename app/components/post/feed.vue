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
    <div
      v-if="props.showViewToggle"
      class="flex items-center justify-end gap-1 mb-4"
    >
      <Button
        :variant="viewMode === ViewMode.GRID ? 'default' : 'ghost'"
        size="icon"
        class="h-8 w-8"
        @click="viewMode = ViewMode.GRID"
      >
        <LayoutGrid class="w-4 h-4" />
      </Button>

      <Button
        :variant="viewMode === ViewMode.LIST ? 'default' : 'ghost'"
        size="icon"
        class="h-8 w-8"
        @click="viewMode = ViewMode.LIST"
      >
        <List class="w-4 h-4" />
      </Button>
    </div>

    <!-- GRID VIEW -->
    <div
      v-if="viewMode === 'grid'"
      :class="`grid ${gridCols} gap-6 stagger-children`"
    >
      <template v-for="(item, index) in items" :key="index">
        <div
          v-if="item.type === 'ad'"
          :class="
            props.columns === 3
              ? 'md:col-span-2 lg:col-span-3'
              : 'md:col-span-2 lg:col-span-4'
          "
        >
          <AdComponent size="inline" />
        </div>

        <PostCard v-else :post="item.post" />
      </template>
    </div>

    <!-- LIST VIEW -->
    <div v-else class="space-y-4">
      <template v-for="(item, index) in items" :key="index">
        <AdComponent v-if="item.type === 'ad'" size="inline" />
        <PostCard v-else :post="item.post" variant="compact" />
      </template>
    </div>
    <div ref="loadTrigger" class="h-10"></div>
  </div>
</template>
