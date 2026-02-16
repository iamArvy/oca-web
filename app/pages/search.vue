<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Posts } from '~/types'

const route = useRoute()
const q = computed(() => route.query.q as string)

const { data: trendingPosts } = await useFetch<Posts>('/api/posts', {
  cache: "no-cache",
  query: {
    trending: true,
    limit: 5,
  }
})

const { data: initialPosts } = await useFetch<Posts>('/api/posts', {
  cache: "no-cache",
  query: {
    q,
    limit: 18,
  }
})

const posts = ref<Posts>(initialPosts.value || [])
</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #header>
        <CategoryHeader name="Search Results" :postCount="posts?.length || 0" />
      </template>
      <template #main>
        <PostFeed v-if="posts.length > 0" :posts="posts" />
        <div v-else class="text-center py-12 text-muted-foreground">
          <p>No posts found with this query.</p>
        </div>
      </template>

      <template #sidebar>
        <AdComponent size="sidebar" />
        <WidgetsPosts v-if="trendingPosts && trendingPosts.length > 0" :posts="trendingPosts" title="Trending" />
        <AdComponent size="sidebar" />
        <WidgetsNewsletter />
      </template>
    </AppContent>
  </main>
</template>
