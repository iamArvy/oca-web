<script setup lang="ts">
import mobile from "./mobile.vue";
import desktop from "./desktop.vue";
import type { LiveSourceAdminData } from "~/types";

interface Props {
  sources: LiveSourceAdminData[];
}

interface Emits {
  (e: "edit" | "delete", item: LiveSourceAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { isMobile } = useMobile('md');

const components = {
  mobile,
  desktop,
};

const currentComponent = computed(() =>
  isMobile.value ? components.mobile : components.desktop,
);
</script>

<template>
  <component :is="currentComponent" :sources="sources" @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)" />
</template>
