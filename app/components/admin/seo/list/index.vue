<script setup lang="ts">
import mobile from "./mobile.vue";
import desktop from "./desktop.vue";
import type { Seo } from "~/types";

interface Props {
  seos: Seo[];
}

interface Emits {
  (e: "edit" | "delete", item: Seo): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { isMobile } = useMobile();

const components = {
  mobile,
  desktop,
};

const currentComponent = computed(() =>
  isMobile.value ? components.mobile : components.desktop,
);
</script>

<template>
  <component :is="currentComponent" :seos="seos" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
</template>
