<script setup lang="ts">
const { loading, posts, loadMore } = await useFeed('/latest-posts')
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
        <div>
          <h2 class="font-display text-2xl md:text-3xl font-bold mb-6 relative">
            Latest News
            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
          </h2>
          <ClientOnly>
            <PostFeed :posts="posts" @load-more="loadMore" />
          </ClientOnly>
          <div v-if="loading" class="text-center py-6 text-muted-foreground">
            Loading more posts...
          </div>
        </div>
      </template>
      <template #sidebar>
        <AdComponent size="sidebar" />
        <!-- <WidgetsPopularPosts /> -->
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
