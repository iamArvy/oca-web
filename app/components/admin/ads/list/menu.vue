<script setup lang="ts">
import {
  Edit,
  Trash2,
  MoreHorizontal,
} from "@lucide/vue";

import type { AdAdminData } from '~/types';

interface Props {
  item: AdAdminData;
}

interface Emits {
  (e: "edit" | "delete", ad: AdAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8 shrink-0">
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
