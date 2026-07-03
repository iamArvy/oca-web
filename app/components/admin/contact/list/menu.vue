<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal, Check } from "@lucide/vue";

import { ContactMessageStatusOptions, type ContactMessage } from "~/types";

interface Props {
  item: ContactMessage;
}

interface Emits {
  (e: "delete", item: ContactMessage): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { handleUpdateStatus } = useContactMessageActions();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="bg-card">
      <DropdownMenuSub>
        <DropdownMenuSubTrigger class="gap-2">
          <Edit class="w-4 h-4" /> Update Status
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent class="bg-card">
          <DropdownMenuItem v-for="s in ContactMessageStatusOptions" :key="s.value" class="gap-2"
            @click="handleUpdateStatus(item, s.value)">
            <template v-if="item.status === s.value">
              <Check class="w-4 h-4 text-primary" />
              <span class="text-primary font-medium">{{ s.label }}</span>
            </template>

            <template v-else>
              <div class="w-4 h-4" />
              <span>{{ s.label }}</span>
            </template>
            <!-- <span class="text-xs text-muted-foreground ml-auto">{s.postIds.length}/{s.maxPosts}</span> -->
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
