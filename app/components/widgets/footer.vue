<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { PostWebsiteData } from '~/types';

interface Props {
  label: string;
  posts: PostWebsiteData[]
}

defineProps<Props>()
</script>
<template>
  <div class="text-white">
    <p class="text-xl mb-3">{{ label }}</p>
    <ul class="space-y-4">
      <li v-for="item in posts" :key="item.id">
        <NuxtLink :to="APP_ROUTES.post(item.slug)"
          class="line-clamp-2 hover:text-primary transition-colors duration-300 ">
          {{ item.title }}
        </NuxtLink>
        <small>
          <span v-if="item.author">Posted By: {{ item.author.name }}</span>
          <NuxtLink v-else-if="item.feed" :to="APP_ROUTES.source(item.feed.slug)">
            Source: {{ item.feed.name }}
          </NuxtLink>
          |
          {{ new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) }}
        </small>
      </li>
    </ul>
  </div>
</template>