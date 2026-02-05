<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { posts, categories } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const subSlug = computed(() => route.params.subSlug as string)
// const category = computed(() =>
//   categories.find((c) => c.slug === subslug.value)
// )

const { data: category, error } = await useFetch(`/api/subcategory`, {
  params: {
    slug: slug.value,
    subSlug: subSlug.value
  }
})
if (!category.value) {
  throw createError(error.value || {
    status: 404,
    statusText: 'Subcategory Not Found',
  })
}
</script>

<template>
  <!-- Main Content -->
  <main v-if="category" class="container-lg py-8 md:py-12">
    <!-- Category Header -->
    <div class="mb-8">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-2">
        {{ category.name }}
      </h1>
      <p class="text-muted-foreground">
        {{ category.posts.length || 0 }} articles in this category
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Posts Grid -->
      <div class="lg:col-span-2">
        <div v-if="category.posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          <PostCard v-for="post in category.posts" :key="post.id" :post="post" />
        </div>

        <div v-else class="text-center py-12 text-muted-foreground">
          <p>No posts found in this category.</p>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <AdComponent size="sidebar" />

        <div class="bg-card rounded-2xl p-6 card-interactive">
          <h3 class="font-display text-lg font-bold mb-4">
            Other Categories
          </h3>
          <div class="space-y-2">
            <NuxtLink v-for="cat in categories.filter(c => c.slug !== slug)" :key="cat.id"
              :to="APP_ROUTES.category.path(cat.slug)"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
              <span class="font-medium">{{ cat.name }}</span>
              <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {{ cat.count }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <AdComponent size="sidebar" />
      </aside>
    </div>
  </main>
</template>
