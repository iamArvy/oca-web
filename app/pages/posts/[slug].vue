<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import placeholder from "~/assets/images/oca-placeholder.png";
import { API_ROUTES } from "~/constants";
import type { PostWebsiteData, ApiResponse } from "~/types";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: res } = await useAPI<ApiResponse<PostWebsiteData>>(API_ROUTES.public.post(slug.value));

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
      <NuxtImg :src="post.image ?? undefined" :alt="post.title" :placeholder="placeholder"
        class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
    </div>
    <AppContent class="-mt-32 relative z-10">
      <template #main>
        <PostArticle :post="post" />
        <CommentSection :postId="post.id" />
      </template>

      <template #sidebar>
        <PostAuthor v-if="post.author" v-bind="post.author" />
        <PostSource v-else-if="post.feed" v-bind="post.feed" />
        <AdComponent size="sidebar" />
        <WidgetsHotClicks />
        <!-- Related Post widget -->
      </template>
      <TopicFeed :route="API_ROUTES.public.relatedTopics(post.topic.slug)" />
    </AppContent>
  </main>
</template>
