<script setup lang="ts">
import { ref, computed } from 'vue'
import { posts, categories } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants'

const technologyPosts = computed(() =>
  posts.filter((p) => p.category.name === 'Technology')
)
const sportsPosts = computed(() =>
  posts.filter((p) => p.category.name === 'Sports')
)
const entertainmentPosts = computed(() =>
  posts.filter((p) => p.category.name === 'Entertainment')
)
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="container-lg py-6 md:py-10 mx-auto">
      <HomeHero :posts="posts" />
    </section>

    <!-- Ad Banner -->
    <section class="container-lg pb-6 mx-auto">
      <AdComponent size="banner" />
    </section>
    <AppContent>
      <template #main>
        <div>
          <h2 class="font-display text-2xl md:text-3xl font-bold mb-6 relative">
            Latest News
            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-hero rounded-full" />
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            <PostCard v-for="post in posts.slice(0, 4)" :key="post.id" :post="post" />
          </div>
        </div>

        <!-- Inline Ad -->
        <AdComponent size="inline" />

        <!-- More Posts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          <PostCard v-for="post in posts.slice(4, 8)" :key="post.id" :post="post" />
        </div>
      </template>
      <template #sidebar>
        <AdComponent size="sidebar" />
        <!-- Categories -->
        <div class="bg-card rounded-2xl p-6 card-interactive">
          <h3 class="font-display text-lg font-bold mb-4">Categories</h3>
          <div class="space-y-2">
            <NuxtLink v-for="category in categories" :key="category.id" :to="APP_ROUTES.category.path(category.slug)"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
              <span class="font-medium">{{ category.name }}</span>
              <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {{ category.count }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Popular Posts -->
        <div class="bg-card rounded-2xl p-6 card-interactive">
          <h3 class="font-display text-lg font-bold mb-4">Popular Posts</h3>
          <div class="space-y-1">
            <PostCard v-for="post in posts.slice(0, 5)" :key="post.id" :post="post" variant="compact" />
          </div>
        </div>

        <!-- Another Sidebar Ad -->
        <AdComponent size="sidebar" />
      </template>
      <div class="bg-muted/30">
        <div class="container-lg">
          <CategorySection title="Technology" :posts="technologyPosts" slug="technology" />
        </div>
      </div>

      <div class="container-lg">
        <CategorySection title="Sports" :posts="sportsPosts" slug="sports" />
      </div>

      <div class="bg-muted/30">
        <div class="container-lg">
          <CategorySection title="Entertainment" :posts="entertainmentPosts" slug="entertainment" />
        </div>
      </div>
    </AppContent>
  </main>
</template>
