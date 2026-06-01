<script setup lang="ts">
import type { ContactMessage } from "~/types";

interface Props {
  messages: ContactMessage[];
}

interface Emits {
  (e: "delete", item: ContactMessage): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="space-y-3">
    <div v-for="item in messages" :key="item.id" class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-sm line-clamp-2 text-left hover:text-primary transition-colors">
            {{ item.name }}
          </h3>

          <p class="text-xs text-muted-foreground mt-1">
            {{ item.email }} - {{ item.company }} - {{ item.type }} - {{ item.status }} - {{ item.createdAt }}
          </p>
        </div>

        <AdminContactListMenu :item="item" @delete="$emit('delete', $event)" />
      </div>
    </div>
  </div>
</template>
