<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal, Layers } from "lucide-vue-next";

import type { Collection } from "~/types";

interface Props {
  collections: Collection[];
}

interface Emits {
  (e: "edit" | "delete" | "manage-posts", item: Collection): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="collection in collections" :key="collection.id"
      class="bg-card rounded-2xl p-5 card-interactive relative group">
      <div class="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="bg-card">
            <DropdownMenuItem class="gap-2" @click="$emit('edit', collection)">
              <Edit class="w-4 h-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem class="gap-2" @click="$emit('manage-posts', collection)">
              <Layers class="w-4 h-4" />
              Manage Posts
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem class="gap-2 text-destructive" @click="$emit('delete', collection)">
              <Trash2 class="w-4 h-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div class="flex items-center gap-3 mb-3">
        <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Layers class="w-5 h-5 text-primary" />
        </div>

        <div class="min-w-0">
          <h3 class="font-display font-bold cursor-pointer hover:text-primary transition-colors truncate"
            @click="$emit('manage-posts', collection)">
            {{ collection.name }}
          </h3>

          <p class="text-xs text-muted-foreground line-clamp-1">
            {{ collection.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
