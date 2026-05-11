<script setup lang="ts">
import { API_ROUTES } from '~/constants';
import type { ApiResponse, Seo } from '~/interfaces';

const query = computed(() => ({
  days: 1,
}));

const { data: seo } = useAPI<ApiResponse<Seo>>(API_ROUTES.seo.path('home'), { server: true });

useSeoMeta(seo.value?.data ? {
  title: seo.value.data.title,
  description: seo.value.data.description,
  ogTitle: seo.value.data.title,
  ogDescription: seo.value.data.description,
  twitterCard: 'summary_large_image',
  twitterTitle: seo.value.data.title,
  twitterDescription: seo.value.data.description,
  keywords: seo.value.data.keywords.flat().join(', '),
} : {})
</script>

<template>
  <main>
    <h1 class="sr-only">
      Latest News, Trends & Stories
    </h1>
    <section class="container-lg py-6 md:py-10 mx-auto">
      <HomeHero />
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
