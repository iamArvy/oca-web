<script setup lang="ts">
import { computed } from "vue";
import basic from "./basic.vue";
import base from "./default.vue";

interface Props {
  mode: ViewMode
}

const props = defineProps<Props>();
const components: Record<ViewMode, Component> = {
  [ViewMode.DEFAULT]: base,
  [ViewMode.BASIC]: basic,
};

const component = computed(() => {
  return components[props.mode] || base;
});
</script>

<template>
  <component :is="component" />
</template>
