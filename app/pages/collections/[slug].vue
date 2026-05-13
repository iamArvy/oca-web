<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { API_ROUTES } from '~/constants'
import type { ApiResponse, Collection } from '~/interfaces'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: collection, error } = await useAPI<ApiResponse<Collection>>(API_ROUTES.collection.path(slug.value))

if (!collection.value?.data) {
  throw createError(error.value || {
    status: 404,
    statusText: 'Collection Not Found',
  })
}

const query = {
  collection: slug.value
}

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #main>
        <PostFeed :title="collection?.data?.name || slug" :query="query" />
      </template>

      <template #sidebar>
        <WidgetsHotClicks />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
      </template>
    </AppContent>
  </main>
</template>
