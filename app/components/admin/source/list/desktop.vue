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
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[40%]">Name</TableHead>
          <TableHead>Source</TableHead>
          <TableHead class="w-12.5" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in sources" :key="item.id" class="hover:bg-muted/50">
          <TableCell>
            {{ item.name }}
          </TableCell>
          <TableCell>{{ item.source }}</TableCell>
          <TableCell>
            <AdminSourceListMenu :item="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
