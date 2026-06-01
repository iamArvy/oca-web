<script setup lang="ts">
import type { LiveSourceAdminData } from "~/types";

interface Props {
  sources: LiveSourceAdminData[];
}

interface Emits {
  (e: "edit" | "delete", item: LiveSourceAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="space-y-3">
    <div v-for="item in sources" :key="item.id" class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-sm line-clamp-2 text-left hover:text-primary transition-colors">
            {{ item.name }}
          </h3>

          <p class="text-xs text-muted-foreground mt-1">
            {{ item.source }}
          </p>
        </div>

        <AdminSourceListMenu :item="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
      </div>
    </div>
  </div>
</template>
