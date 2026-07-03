<script setup lang="ts">
import {
  Edit,
  Trash2,
  ExternalLink,
  MoreHorizontal,
  Share2,
} from "@lucide/vue"

import type { PostAdminData } from "~/types";

interface Props {
  item: PostAdminData;
}

interface Emits {
  (e: "share" | "edit" | "delete", post: PostAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="bg-card">
      <DropdownMenuItem class="gap-2" @click="$emit('edit', item)">
        <Edit class="w-4 h-4" />
        Edit
      </DropdownMenuItem>

      <DropdownMenuItem class="gap-2" @click="$emit('share', item)">
        <Icon name="lucide:share-2" class="w-4 h-4" />
        Share
      </DropdownMenuItem>

      <NuxtLink :to="`/posts/${item.slug}`" target="_blank" rel="noopener noreferrer" as-child>
        <DropdownMenuItem class="gap-2">
          <ExternalLink class="w-4 h-4" />
          View on site
        </DropdownMenuItem>
      </NuxtLink>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="gap-2 text-destructive focus:text-destructive" @click="$emit('delete', item)">
        <Trash2 class="w-4 h-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
