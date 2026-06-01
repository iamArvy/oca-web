<script setup lang="ts">
import mobile from "./mobile.vue";
import desktop from "./desktop.vue";
import type { ContactMessage } from "~/types";

interface Props {
  messages: ContactMessage[];
}

interface Emits {
  (e: "delete", item: ContactMessage): void;
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
  <component :is="currentComponent" :messages="messages" @delete="$emit('delete', $event)" />
</template>
