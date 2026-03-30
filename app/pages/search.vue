<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = computed(() => ({
  q: route.query.q as string
}))

const { loading, posts, loadMore } = useFeed(query)

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #main>
        <PostFeed title="Search Results" :posts="posts" @load-more="loadMore" :loading="loading" />
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
