<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { API_ROUTES } from '~/constants'
import type { ApiResponse, Topic } from '~/interfaces'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: topic, error } = await useAPI<ApiResponse<Topic>>(API_ROUTES.topic.path(slug.value))

if (!topic.value?.data) {
  throw createError(error.value || {
    status: 404,
    statusText: 'Topic Not Found',
  })
}

const { loading, posts, loadMore } = useFeed(API_ROUTES.posts.path, {
  topic: slug
})

const pageTitle = computed(() => topic.value?.data?.name || slug.value)
</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #main>
        <PostFeed :title="pageTitle" :posts="posts" @load-more="loadMore" :loading="loading" />
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
