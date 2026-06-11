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
  <div class="space-y-3">
    <div v-for="post in posts" :key="post.id" class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex items-start gap-3">
        <NuxtImg :src="post.image ?? undefined" class="aspect-square w-16 h-16 rounded-xl object-cover shrink-0"
          placeholder="/oca-placeholder.png" />

        <div class="flex-1 min-w-0">
          <NuxtLink :to="APP_ROUTES.post(post.slug)" target="__blank"
            class="font-medium text-sm line-clamp-2 text-left hover:text-primary transition-colors">
            {{ post.title }}
          </NuxtLink>

          <p class="text-xs text-muted-foreground mt-1">
            {{ post.author?.name ?? post.feed?.name ?? "Guest" }}
          </p>

          <div class="flex items-center gap-2 mt-2">
            <span class="category-pill text-[10px]">
              {{ post.topic.name }}
            </span>
          </div>
        </div>
        <AdminPostListMenu :item="post" @share="$emit('share', $event)" @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)" />
      </div>
    </div>
  </div>
</template>
