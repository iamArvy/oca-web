<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { API_ROUTES } from '~/constants'
import type { ApiResponse, Topic } from '~/types'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: topic, error } = await useAPI<ApiResponse<Topic>>(API_ROUTES.public.topic(slug.value))

if (!topic.value?.data) {
  throw createError(error.value || {
    status: 404,
    statusText: 'Topic Not Found',
  })
}

const query = {
  topic: topic.value.data.id,
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
        <WidgetsHotClicks :topic="topic?.data.id" />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
      </template>
      <TopicFeed :route="API_ROUTES.public.topics" :query="{ relatedTo: topic?.data.id }" />
    </AppContent>
  </main>
</template>
