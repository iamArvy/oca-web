<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { API_ROUTES } from '~/constants'
import type { ApiResponse, Feed } from '~/interfaces'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: feed, error } = await useAPI<ApiResponse<Feed>>(API_ROUTES.feed.path(slug.value))

if (!feed.value?.data) {
  throw createError(error.value || {
    status: 404,
    statusText: 'Source Not Found',
  })
}

const { loading, posts, loadMore, count } = await useFeed(API_ROUTES.posts.path, {
  feed: slug
})

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #header>
        <CategoryHeader :name="feed?.data?.name || slug" :postCount="count || 0" />
      </template>
      <template #main>
        <PostFeed :posts="posts" @load-more="loadMore" :loading="loading" />
      </template>

      <template #sidebar>
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
        <AdComponent size="sidebar" />
        <WidgetsHotClicks />
        <AdComponent size="sidebar" />
      </template>
    </AppContent>
  </main>
</template>
