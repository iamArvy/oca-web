<script setup lang="ts">
import { API_ROUTES } from '~/constants';

const query = computed(() => ({
  days: 1,
  limit: 36,
}));

const { loading, posts, loadMore } = useFeed(query);
</script>

<template>
  <main>
    <section class="container-lg py-6 md:py-10 mx-auto">
      <HomeHero />
    </section>

    <section class="container-lg pb-6 mx-auto">
      <AdComponent size="banner" />
    </section>

    <AppContent>
      <template #main>
        <PostFeed title="Latest News" :posts="posts" :loading="loading" />
        <TopicFeed :route="API_ROUTES.topicPosts.path" :query="{ limit: 3, postLimit: 3 }" />
      </template>
      <template #sidebar>
        <WidgetsHotClicks />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
        <AdComponent size="sidebar" />
        <WidgetsNewsletter />
      </template>
    </AppContent>
  </main>
</template>
