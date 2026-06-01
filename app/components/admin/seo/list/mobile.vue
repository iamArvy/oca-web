<script setup lang="ts">
import type { Seo } from "~/types";

interface Props {
  sources: Seo[];
}

interface Emits {
  (e: "edit" | "delete", item: Seo): void;
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
            {{ item.title }}
          </h3>

          <p class="text-xs text-muted-foreground mt-1">
            {{ item.slug }}
          </p>
        </div>

        <AdminSeoListMenu :item="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
      </div>
    </div>
  </div>
</template>
