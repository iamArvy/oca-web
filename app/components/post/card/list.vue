<script setup lang="ts">
import { Dot } from "lucide-vue-next";
import { APP_ROUTES } from "~/constants";
import type { PostWebsiteListData } from "~/types";

interface Props {
  post: PostWebsiteListData;
}

const props = defineProps<Props>();
</script>

<template>
  <article>
    <NuxtLink :to="APP_ROUTES.post(post.slug)"
      class="font-semibold text-sm mt-1 line-clamp-2 hover:text-primary transition-colors">
      {{ post.title }}
    </NuxtLink>
    <p class="flex items-center text-xs">
      <NuxtLink :to="APP_ROUTES.topic(post.topic.slug)" class="hover:underline">
        {{ props.post.topic.name }}
      </NuxtLink>
      <Dot />
      <template v-if="post.author" class="hover:underline">
        {{ post.author.name }}
      </template>
      <NuxtLink :to="APP_ROUTES.source(post.feed.slug)" v-else-if="post.feed" class="hover:underline">
        {{ post.feed.name }}
      </NuxtLink>
      <Dot />
      <span>
        {{ formatDateCompact(post.createdAt) }} ago
      </span>
    </p>
  </article>
</template>