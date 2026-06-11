<script setup lang="ts">
import { APP_ROUTES } from "~/constants";
import type { PostAdminData } from "~/types";

interface Props {
  posts: PostAdminData[];
}

interface Emits {
  (e: "share" | "edit" | "delete", post: PostAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <div class="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-12.5" />
            <TableHead class="w-[40%]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Views</TableHead>
            <TableHead class="w-12.5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="item in posts" :key="item.id" class="hover:bg-muted/50">
            <TableCell>
              <NuxtImg :src="item.image ?? undefined" class="aspect-square" placeholder="/oca-placeholder.png" />
            </TableCell>
            <TableCell class="font-medium truncate">
              <NuxtLink :to="APP_ROUTES.post(item.slug)" target="__blank"
                class="hover:text-primary transition-colors line-clamp-1 text-left flex items-center gap-2 max-w-125 truncate">
                {{ item.title }}
              </NuxtLink>
            </TableCell>

            <TableCell class="text-muted-foreground">
              {{ item.author?.name ?? item.feed?.name ?? "" }}
            </TableCell>

            <TableCell>
              <span class="category-pill">{{ item.topic.name }}</span>
            </TableCell>

            <TableCell class="text-muted-foreground">
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </TableCell>

            <TableCell>
              {{ item.views.toLocaleString() }}
            </TableCell>

            <TableCell>
              <AdminPostListMenu :item="item" @share="$emit('share', $event)" @edit="$emit('edit', $event)"
                @delete="$emit('delete', $event)" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
