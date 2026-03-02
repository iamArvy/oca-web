<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categories } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { setCurrentCategory } = useCategory()

// const { data: category, error } = await useFetch(`/api/category`, {
//   params: {
//     slug: slug.value
//   }
// })

// if (!category.value) {
//   throw createError(error.value || {
//     status: 404,
//     statusText: 'Category Not Found',
//   })
// }
const category = categories[0]
onMounted(() => {
  setCurrentCategory(category)
})

const { loading, posts, loadMore } = await useFeed('/latest-posts')

</script>

<template>
  <main>
    <AppContent class="py-8 md:py-12">
      <template #header>
        <CategoryHeader :name="category?.name || slug" :postCount="posts?.length || 0" />
      </template>
      <template #main>
        <PostFeed :posts="posts" @load-more="loadMore" />
        <div v-if="loading" class="text-center py-6 text-muted-foreground">
          Loading more posts...
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
