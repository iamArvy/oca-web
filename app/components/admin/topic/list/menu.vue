<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal, Plus } from "lucide-vue-next";

import type { Topic } from "~/types";

interface Props {
  topic: Topic;
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
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="bg-card">
      <DropdownMenuItem class="gap-2" @click="$emit('edit', topic)">
        <Edit class="w-4 h-4" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-2" @click="$emit('create-subtopic', topic)">
        <Plus class="w-4 h-4" />
        Add Subcategory
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-2 flex items-center" @click="$emit('toggle-featured', topic)">
        <Icon :name="topic.isFeatured ? 'lucide:star-off' : 'lucide:star'" class="w-4 h-4" />
        {{ topic.isFeatured ? "Remove from featured" : "Add to featured" }}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="gap-2 text-destructive focus:text-destructive" @click="$emit('delete', topic)">
        <Trash2 class="w-4 h-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
