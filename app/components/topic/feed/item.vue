<script setup lang="ts">
import { APP_ROUTES } from '~/constants'
import type { TopicPosts } from '~/types'

const props = defineProps<TopicPosts>()
</script>

<template>
  <section class="py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display text-2xl md:text-3xl font-bold relative">
        {{ name }}
        <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
      </h2>

      <NuxtLink :to="APP_ROUTES.topic(slug)"
        class="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
        View All
        <Icon name="lucide:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-children">
      <PostCard v-for="post in props.posts.slice(0, 4)" :key="post.id" :post="post" variant="grid" />
    </div>
  </section>
</template>
