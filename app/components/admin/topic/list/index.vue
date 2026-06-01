<script setup lang="ts">
import type { Topic } from "~/types";

interface Props {
  topics: Topic[];
}

interface Emits {
  (
    e: "edit" | "delete" | "create-subtopic" | "toggle-featured",
    item: Topic,
  ): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <div type="multiple" class="w-full space-y-1">
      <TopicListItem v-for="item in topics" :key="item.id" :item="item" @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)" @create-subtopic="$emit('create-subtopic', $event)"
        @toggle-featured="$emit('toggle-featured', $event)" />
    </div>
  </div>
</template>
