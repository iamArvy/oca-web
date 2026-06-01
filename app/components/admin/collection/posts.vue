<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { Collection } from "~/types";

interface Props {
  collection: Collection;
}

const props = defineProps<Props>();
const { posts, loading, handleRemovePost } = useCollectionPosts(
  props.collection.id,
);
</script>
<template>
  <div class="flex-1 overflow-y-auto space-y-4 py-2">
    <template v-if="loading"> loading </template>
    <template v-else>
      <div v-if="posts.length > 0">
        <p class="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Current Posts
        </p>

        <div class="space-y-2">
          <div v-for="post in posts" :key="post.id"
            class="flex items-center gap-3 p-2.5 rounded-xl border border-border">
            <img :src="post.image ?? undefined" alt="" class="w-12 h-12 rounded-lg object-cover" />

            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm line-clamp-1">
                {{ post.title }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ post.topic.name }} ·
                {{ post.author?.name || post.feed?.name || "Guest" }}
              </p>
            </div>

            <Button size="sm" variant="ghost" class="text-destructive hover:text-destructive shrink-0"
              @click="handleRemovePost(post.id)">
              <X class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
