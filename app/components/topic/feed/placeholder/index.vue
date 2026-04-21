<script setup lang="ts">
import { computed } from "vue";
import list from "./list.vue";
import grid from "./grid.vue";
import basic from "./basic.vue";


interface Props {
  mode: ViewMode
}

const props = defineProps<Props>();
const components: Record<ViewMode, Component> = {
  [ViewMode.GRID]: grid,
  [ViewMode.LIST]: list,
  [ViewMode.BASIC]: basic,
};

const component = computed(() => {
  return components[props.mode] || grid;
});
</script>

<template>
  <component :is="component" />
</template>
