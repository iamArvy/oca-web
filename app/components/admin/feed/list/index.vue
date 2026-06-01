<script setup lang="ts">
import type { FeedAdminData } from "~/types";

interface Props {
  feeds: FeedAdminData[];
}

interface Emits {
  (e: "edit" | "delete", item: FeedAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { isMobile } = useMobile('md');
</script>

<template>
  <AdminFeedListMobile v-if="isMobile" :feeds="feeds" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
  <AdminFeedListDesktop v-else :feeds="feeds" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
</template>
