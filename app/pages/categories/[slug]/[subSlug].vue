<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categories } from '~/lib/mocks'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const subSlug = computed(() => route.params.subSlug as string)

// const { data: category, error } = await useFetch(`/api/subcategory`, {
//   params: {
//     slug: slug.value,
//     subSlug: subSlug.value
//   }
// })

// if (!category.value) {
//   throw createError(error.value || {
//     status: 404,
//     statusText: 'Subcategory Not Found',
//   })
// }
// const { data: trendingPosts } = await useFetch<Posts>('/api/posts', {
//   cache: "no-cache",
//   query: {
//     trending: true,
//     limit: 5,
//   }
// })

const category = categories[0]?.subcategories?.[0]
// onMounted(() => {
//   setCurrentCategory(category)
// })

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
        <!-- <WidgetsPosts v-if="trendingPosts && trendingPosts.length > 0" :posts="trendingPosts" title="Trending" /> -->
        <AdComponent size="sidebar" />
        <WidgetsNewsletter />
      </template>
    </AppContent>
  </main>
</template>
