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

const query = {
  topic: slug.value
}

const pageTitle = computed(() => topic.value?.data?.name || slug.value)
</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #main>
        <PostFeed :title="pageTitle" :query="query" />
      </template>

      <template #sidebar>
        <WidgetsHotClicks :topic="slug" />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
        <AdComponent size="sidebar" />
      </template>
      <TopicFeed :route="API_ROUTES.relatedTopics.path(slug)" :query="{ limit: 3, postLimit: 3 }" />
    </AppContent>
  </main>
</template>
