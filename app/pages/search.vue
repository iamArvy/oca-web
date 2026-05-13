<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { API_ROUTES } from '~/constants'

const route = useRoute()
const query = computed(() => ({
  q: route.query.q as string
}))

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #main>
        <PostFeed title="Search Results" :query="query" />
      </template>

      <template #sidebar>
        <WidgetsHotClicks />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
      </template>
      <TopicFeed :route="API_ROUTES.topicPosts.path" />
    </AppContent>
  </main>
</template>
