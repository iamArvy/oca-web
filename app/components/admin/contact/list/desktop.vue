<script setup lang="ts">
import type { ContactMessage } from "~/types";

interface Props {
  messages: ContactMessage[];
}

interface Emits {
  (e: "delete", item: ContactMessage): void;
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
          <TableHead>Email</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead class="w-12.5" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in messages" :key="item.id" class="hover:bg-muted/50">
          <TableCell>
            {{ item.name }}
          </TableCell>
          <TableCell>{{ item.email }}</TableCell>
          <TableCell>
            {{ item.company }}
          </TableCell>
          <TableCell>
            {{ item.type }}
          </TableCell>
          <TableCell>
            {{ item.status }}
          </TableCell>
          <TableCell>
            {{ item.createdAt }}
          </TableCell>
          <TableCell>
            <ContactListMenu :item="item" @delete="$emit('delete', $event)" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
