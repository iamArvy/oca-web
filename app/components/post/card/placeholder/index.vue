<script setup lang="ts">
import { computed } from "vue";

import compact from "./compact.vue";
import grid from "./grid.vue";
import list from "./list.vue";

interface Props {
  variant?: "default" | "grid" | "list";
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
  <component :is="component" />
</template>