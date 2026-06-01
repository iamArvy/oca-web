<script setup lang="ts">
import {
  Eye,
  Edit,
  Trash2,
  Layers,
  Check,
  ExternalLink,
  MoreHorizontal,
} from "lucide-vue-next";

import type { PostAdminData } from "~/types";

interface Props {
  item: PostAdminData;
}

interface Emits {
  (e: "view" | "edit" | "delete", post: PostAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { collections, toggleCollection } = useManagePostCollections();
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="bg-card">
      <DropdownMenuItem class="gap-2" @click="$emit('view', item)">
        <Eye class="w-4 h-4" />
        View
      </DropdownMenuItem>

      <DropdownMenuItem class="gap-2" @click="$emit('edit', item)">
        <Edit class="w-4 h-4" />
        Edit
      </DropdownMenuItem>

      <NuxtLink :to="`/posts/${item.slug}`" target="_blank" rel="noopener noreferrer" as-child>
        <DropdownMenuItem class="gap-2">
          <ExternalLink class="w-4 h-4" />
          View on site
        </DropdownMenuItem>
      </NuxtLink>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger class="gap-2">
          <Layers class="w-4 h-4" /> Collections
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent class="bg-card">
          <DropdownMenuItem v-for="c in collections" :key="c.id" class="gap-2" @click="toggleCollection(item, c.id)">
            <template v-if="item.collections.some((col) => col.collection.id === c.id)">
              <Check class="w-4 h-4 text-primary" />
              <span class="text-primary font-medium">{{ c.name }}</span>
            </template>

            <template v-else>
              <div class="w-4 h-4" />
              <span>{{ c.name }}</span>
            </template>
            <!-- <span class="text-xs text-muted-foreground ml-auto">{c.postIds.length}/{c.maxPosts}</span> -->
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="gap-2 text-destructive focus:text-destructive" @click="$emit('delete', item)">
        <Trash2 class="w-4 h-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
