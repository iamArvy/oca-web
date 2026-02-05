<script setup lang="ts">
import { APP_ROUTES } from '~/constants'
import type { Posts } from '~/types'


interface Post {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  slug: string
}

interface Props {
  title: string
  posts: Posts
  slug: string
}

const props = defineProps<Props>()
</script>

<template>
  <section class="py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display text-2xl md:text-3xl font-bold relative">
        {{ props.title }}
        <span class="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-hero rounded-full" />
      </h2>

      <NuxtLink :to="APP_ROUTES.category.path(slug)"
        class="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
        View All
        <Icon name="lucide:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      <PostCard v-for="post in props.posts.slice(0, 3)" :key="post.id" :post="post" />
    </div>
  </section>
</template>
