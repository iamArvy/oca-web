<script setup lang="ts">
import { API_ROUTES } from '~/constants';
import type { ApiListResponse, LiveSources } from '~/interfaces';

const query = computed(() => ({
  days: 1,
}));

const { data: sources } = useAPI<ApiListResponse<LiveSources>>(API_ROUTES.liveSources.path, { query: { limit: 5 } });

</script>

<template>
  <main>
    <section class="container-lg py-6 md:py-10 mx-auto">
      <!-- <HomeHero /> -->
      <LivePlayer :sources="sources?.data" />
    </section>

    <section class="container-lg pb-6 mx-auto">
      <AdComponent size="banner" />
    </section>

    <AppContent>
      <template #main>
        <PostFeed title="Latest News" :query="query" />
      </template>
      <template #sidebar>
        <WidgetsHotClicks />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
        <AdComponent size="sidebar" />
      </template>
      <TopicFeed :route="API_ROUTES.topicPosts.path" />
    </AppContent>
  </main>
</template>
