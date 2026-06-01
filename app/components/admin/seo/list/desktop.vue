<script setup lang="ts">
import type { Seo } from "~/types";

interface Props {
  seos: Seo[];
}

interface Emits {
  (e: "edit" | "delete", item: Seo): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[40%]">Title</TableHead>
          <TableHead>Source</TableHead>
          <TableHead class="w-12.5" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in seos" :key="item.id" class="hover:bg-muted/50">
          <TableCell>
            {{ item.title }}
          </TableCell>
          <TableCell>{{ item.slug }}</TableCell>
          <TableCell>
            <AdminSeoListMenu :item="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
