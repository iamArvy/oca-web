<script setup lang="ts">
import type { PostAdminData } from "~/types";

interface Props {
  posts: PostAdminData[];
}

interface Emits {
  (e: "view" | "edit" | "delete", post: PostAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { isMobile } = useMobile();
</script>

<template>
  <AdminPostListMobile v-if="isMobile" :posts="posts" @view="$emit('view', $event)" @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)" />
  <AdminPostListDesktop v-else :posts="posts" @view="$emit('view', $event)" @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)" />
</template>
