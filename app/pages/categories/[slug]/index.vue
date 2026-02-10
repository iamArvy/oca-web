<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categories } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { currentCategory, setCurrentCategory } = useCategory()

const { data: category, error } = await useFetch(`/api/category`, {
  params: {
    slug: slug.value
  }
})

if (!category.value) {
  throw createError(error.value || {
    status: 404,
    statusText: 'Category Not Found',
  })
}
onMounted(() => {
  setCurrentCategory(category.value)
})
</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #header>
        <CategoryHeader :name="category?.name || slug" :postCount="category?.posts?.length || 0" />
      </template>
      <template #main>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          <PostCard v-for="post in category?.posts || []" :key="post.id" :post="post" />
        </div>

        <div v-if="(category?.posts || []).length === 0" class="text-center py-12 text-muted-foreground">
          <p>No posts found in this category.</p>
        </div>
      </template>

      <template #sidebar>
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
      </template>
    </AppContent>
  </main>
</template>
