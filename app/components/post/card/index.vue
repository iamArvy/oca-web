<script setup lang="ts">
import { computed } from "vue";
import type { Post } from "~/interfaces";

import featured from "./featured.vue";
import compact from "./compact.vue";
import grid from "./grid.vue";
import list from "./list.vue";

interface Props {
  post: Post;
  variant?: "default" | "featured" | "grid" | "list";
  skeleton?: boolean;
};

const props = defineProps<Props>();

const component = computed(() => {
  switch (props.variant) {
    case "featured":
      return featured;
    case "grid":
      return grid;
    case "list":
      return list;
    default:
      return compact;
  }
});
</script>

<template>
  <component :is="component" :post="post" :skeleton="skeleton" />
</template>