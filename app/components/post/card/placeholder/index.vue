<script setup lang="ts">
import { computed } from "vue";

import compact from "./compact.vue";
import base from "./base.vue";
import list from "./list.vue";

interface Props {
  variant?: "default" | "compact" | "list";
};

const props = defineProps<Props>();

const component = computed(() => {
  switch (props.variant) {
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
  <component :is="component" />
</template>