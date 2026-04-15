<script setup lang="ts">
import { computed } from "vue";
import type { Post } from "~/interfaces";

import featured from "./featured.vue";
import compact from "./compact.vue";
import base from "./base.vue";
import list from "./list.vue";

interface Props {
  post: Post;
  variant?: "default" | "featured" | "compact" | "list";
  skeleton?: boolean;
};

const props = defineProps<Props>();

const component = computed(() => {
  switch (props.variant) {
    case "featured":
      return featured;
    case "compact":
      return compact;
    case "list":
      return list;
    default:
      return base;
  }
});
</script>

<template>
  <component :is="component" :post="post" :skeleton="skeleton" />
</template>