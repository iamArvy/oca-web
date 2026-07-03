<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal } from "@lucide/vue";

import type { LiveSourceAdminData } from "~/types";

interface Props {
  item: LiveSourceAdminData;
}

interface Emits {
  (e: "edit" | "delete", item: LiveSourceAdminData): void;
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
      <DropdownMenuSeparator />
      <DropdownMenuItem class="gap-2 text-destructive focus:text-destructive" @click="$emit('delete', item)">
        <Trash2 class="w-4 h-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
