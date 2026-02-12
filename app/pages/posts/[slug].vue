<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Post, Posts } from '~/types'
import placeholder from "~/assets/images/oca-placeholder.png"

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data } = await useFetch<{ post: Post, relatedPosts: Posts }>('/api/post', {
  params: { slug: slug.value }
})

if (!data.value) {
  throw createError({
    status: 404,
    statusText: 'Post Not Found',
  })
}
const { post, relatedPosts } = data.value
</script>

<template>
  <main>
    <!-- Hero Image -->
    <div class="relative h-75 md:h-112.5 overflow-hidden">
      <NuxtImg :src="post.image" :alt="post.title" :placeholder="placeholder" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
    </div>
    <AppContent class="-mt-32 relative z-10">
      <template #main>
        <PostArticle :post="post" />
        <CommentSection :postId="post.id" />
      </template>

      <template #sidebar>
        <AdComponent size="sidebar" />
        <PostAuthor v-bind="post.author" />
        <AdComponent size="sidebar" />
      </template>

      <section v-if="relatedPosts.length" class="py-12">
        <h2 class="font-display text-2xl md:text-3xl font-bold mb-6 relative">
          Related Posts
          <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          <PostCard v-for="relatedPost in relatedPosts" :key="relatedPost.id" :post="relatedPost" />
        </div>
      </section>
    </AppContent>
  </main>
</template>
