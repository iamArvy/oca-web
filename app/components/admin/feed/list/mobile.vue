<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal } from "lucide-vue-next";

import type { FeedAdminData } from "~/types";

interface Props {
  feeds: FeedAdminData[];
}

interface Emits {
  (e: "edit" | "delete", item: FeedAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="space-y-3">
    <div v-for="feed in feeds" :key="feed.id" class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex items-start gap-3">
        <!-- <NuxtImg
          :src="post.image"
          class="aspect-square w-16 h-16 rounded-xl object-cover shrink-0"
          placeholder="/oca-placeholder.png"
        /> -->

        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-sm line-clamp-2 text-left hover:text-primary transition-colors">
            {{ feed.name }}
          </h3>

          <p class="text-xs text-muted-foreground mt-1">
            {{ feed.source }}
          </p>

          <div class="flex items-center gap-2 mt-2">
            <span class="category-pill text-[10px]">
              {{ feed.topic.name }}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="h-8 w-8 shrink-0">
              <MoreHorizontal class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="bg-card">
            <DropdownMenuItem class="gap-2" @click="$emit('edit', feed)">
              <Edit class="w-4 h-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem class="gap-2 text-destructive focus:text-destructive" @click="$emit('delete', feed)">
              <Trash2 class="w-4 h-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
