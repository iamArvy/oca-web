<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const q = computed(() => route.query.q as string)
const { loading, posts, loadMore } = await useFeed('/posts', { q })

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #header>
        <CategoryHeader name="Search Results" :postCount="posts?.length || 0" />
      </template>
      <template #main>
        <PostFeed :posts="posts" @load-more="loadMore" />
        <div v-if="loading" class="text-center py-6 text-muted-foreground">
          Loading more posts...
        </div>
      </template>

      <template #sidebar>
        <AdComponent size="sidebar" />
        <!-- <WidgetsPosts v-if="trendingPosts && trendingPosts.length > 0" :posts="trendingPosts" title="Trending" /> -->
        <AdComponent size="sidebar" />
        <WidgetsNewsletter />
      </template>
    </AppContent>
  </main>
</template>
