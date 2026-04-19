<script setup lang="ts">
const query = computed(() => ({
  days: 7,
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
        <PostFeed title="Latest News" :posts="posts" @load-more="loadMore" :loading="loading" />
      </template>
      <template #sidebar>
        <AdComponent size="sidebar" />
        <WidgetsHotClicks />
        <AdComponent size="sidebar" />
        <WidgetsEditorPick />
        <AdComponent size="sidebar" />
        <WidgetsNewsletter />
      </template>
      <div class="bg-muted/30">
        <div class="container-lg">
          <!-- <CategorySection
            title="Technology"
            :posts="technologyPosts"
            slug="technology"
          /> -->
        </div>
      </div>

      <div class="container-lg">
        <!-- <CategorySection title="Sports" :posts="sportsPosts" slug="sports" /> -->
      </div>

      <div class="bg-muted/30">
        <div class="container-lg">
          <!-- <CategorySection
            title="Entertainment"
            :posts="entertainmentPosts"
            slug="entertainment"
          /> -->
        </div>
      </div>
    </AppContent>
  </main>
</template>
