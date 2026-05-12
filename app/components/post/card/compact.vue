<script setup lang="ts">
import { APP_ROUTES } from "~/constants";
import type { Post } from "~/interfaces";

interface Props {
  post: Post;
}

const props = defineProps<Props>();
</script>

<template>
  <article class="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
    <NuxtImg :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
      class="w-20 h-20 object-cover rounded-lg shrink-0" />
    <p class="flex-1 min-w-0 ">
      <span class="flex items-center text-primary text-xs space-x-1">
        <NuxtLink :to="APP_ROUTES.topic.path(post.topic.slug)" class="hover:underline">
          {{ props.post.topic.name }}
        </NuxtLink>
        <span>
          |
        </span>
        <span>
          {{ formatDateCompact(post.createdAt) }} ago
        </span>
      </span>
      <NuxtLink :to="APP_ROUTES.post.path(post.slug)"
        class="font-semibold text-sm mt-1 line-clamp-2 hover:text-primary transition-colors">
        {{ post.title }}
      </NuxtLink>
      <span v-if="post.author" class="flex items-center gap-1.5 text-xs mt-2">
        <NuxtImg v-if="post.author.avatar" :src="post.author.avatar" :alt="post.author.name"
          class="w-3 h-3 rounded-full" />
        <Icon v-else name="lucide:user" class="w-3 h-3" />
        {{
          post.author.name
        }}
      </span>
      <NuxtLink :to="APP_ROUTES.source.path(post.feed.slug)" v-else-if="post.feed"
        class="flex items-center gap-1.5 hover:underline text-xs mt-2">
        <NuxtImg v-if="post.feed.image" :src="post.feed.image" class="w-3 h-3 rounded-full" :alt="post.feed.name" />
        <Icon v-else name="lucide:rss" class="w-3 h-3" />
        {{
          post.feed.name
        }}
      </NuxtLink>
    </p>
  </article>
</template>
