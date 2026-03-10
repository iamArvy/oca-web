<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { Posts } from '~/interfaces';

interface Props {
  label: string;
  posts: Posts
}

defineProps<Props>()
</script>
<template>
  <div class="text-white">
    <h3 class="text-xl mb-3">{{ label }}</h3>
    <ul class="space-y-4">
      <li v-for="item in posts" :key="item.id">
        <NuxtLink :to="APP_ROUTES.post.path(item.slug)"
          class="line-clamp-2 hover:text-primary transition-colors duration-300 ">
          {{ item.title }}
        </NuxtLink>
        <small>
          Posted By: {{ item.author?.name ?? item.external?.source }} |
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