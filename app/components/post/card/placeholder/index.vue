<script setup lang="ts">
import { computed } from "vue";

import compact from "./compact.vue";
import base from "./base.vue";

interface Props {
  variant?: "default" | "compact";
};

const props = defineProps<Props>();

const component = computed(() => {
  switch (props.variant) {
    case "compact":
      return compact;
    default:
      return base;
  }
});
</script>

<template>
  <component :is="component" />
</template>