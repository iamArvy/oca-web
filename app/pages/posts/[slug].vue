<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import placeholder from "~/assets/images/oca-placeholder.png";
import { API_ROUTES } from "~/constants";
import type { Post, ApiResponse } from "~/interfaces";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: res } = await useAPI<ApiResponse<Post>>(API_ROUTES.post.path(slug.value));

if (!res.value || !res.value.data) {
  throw createError({
    status: 404,
    statusText: "Post Not Found",
  });
}
const { data: post } = res.value;

const title = computed(() => post?.title || 'Post')
const description = computed(() => post?.excerpt || '')
const image = computed(() => post?.image || 'https://oneclickafrica.com/oca-placeholder.png')
const keywords = computed(() => post?.tags?.join(', ') || '')

// ✅ SEO
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  keywords,
})
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

      <!-- <section v-if="relatedPosts.length" class="py-12">
        <h2 class="font-display text-2xl md:text-3xl font-bold mb-6 relative">
          Related Posts
          <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          <PostCard v-for="relatedPost in relatedPosts" :key="relatedPost.id" :post="relatedPost" />
        </div>
      </section> -->
    </AppContent>
  </main>
</template>
