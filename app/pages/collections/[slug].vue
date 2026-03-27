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

const { loading, posts, loadMore, count } = await useFeed(API_ROUTES.posts.path, {
  collection: slug
})

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #main>
        <PostFeed :title="collection?.data?.name || slug" :posts="posts" @load-more="loadMore" :loading="loading" />
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
