<script setup lang="ts">
import { computed } from "vue";
import type { PostWebsiteListData } from "~/types";

import compact from "./compact.vue";
import grid from "./grid.vue";
import list from "./list.vue";

interface Props {
  post: PostWebsiteListData;
  variant?: "default" | "grid" | "list";
  skeleton?: boolean;
};

const props = defineProps<Props>();

const component = computed(() => {
  switch (props.variant) {
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