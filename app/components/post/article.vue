<script setup lang="ts">
import { APP_ROUTES } from "~/constants";
import type { Post } from "~/interfaces";

defineProps<{
  post: Post;
}>();
</script>
<template>
  <div class="bg-card rounded-2xl p-6 md:p-10 shadow-medium">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
    >
      <Icon name="lucide:arrow-left" class="w-4 h-4" />
      Back to Home
    </NuxtLink>

    <!-- Category -->
    <div class="flex items-center gap-2 mb-4">
      <NuxtLink
        :to="APP_ROUTES.category.path(post.topic.slug)"
        class="category-pill"
      >
        {{ post.topic.name }}
      </NuxtLink>
      <!-- <template v-if="post.subcategory">
        <span class="text-muted-foreground">/</span>
        <NuxtLink :to="APP_ROUTES.subcategory.path(post.category.slug, post.subcategory.slug)"
          class="text-sm text-muted-foreground hover:text-primary transition-colors">
          {{ post.subcategory.name }}
        </NuxtLink>
      </template> -->
    </div>

    <!-- Title -->
    <h1
      class="font-display text-xl md:text-2xl lg:text-3xl font-bold mb-6 leading-tight"
    >
      {{ post.title }}
    </h1>

    <!-- Meta -->
    <div
      class="flex flex-wrap items-center gap-4 md:gap-6 pb-6 mb-6 border-b border-border text-sm text-muted-foreground"
    >
      <span class="flex items-center gap-2">
        <Icon name="lucide:user" class="w-4 h-4" />
        {{ post.author?.name ?? post.external?.source }}
      </span>
      <span class="flex items-center gap-2">
        <Icon name="lucide:calendar" class="w-4 h-4" />
        {{
          new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </span>
      <span class="flex items-center gap-2">
        <Icon name="lucide:clock" class="w-4 h-4" />
        {{ post.readTime }} mins read
      </span>
    </div>

    <PostContent :type="post.type" :content="post.content" />

    <div v-if="post.external" class="mt-8 p-6 bg-muted/50 rounded-xl">
      <p class="text-sm text-muted-foreground mb-3">
        This article was sourced from an external publication.
      </p>
      <Button
        @click="openExternal(post.external.url)"
        class="gap-2 bg-primary hover:opacity-90"
      >
        <Icon name="lucide:external-link" class="w-4 h-4" />
        See Original Post
      </Button>
    </div>

    <div class="mt-8 pt-6 border-t border-border">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-2 text-sm font-medium">
          <Icon name="lucide:share-2" class="w-4 h-4" />
          Share this article
        </span>
        <div class="flex gap-2">
          <Button
            @click="copyPostLink(post.slug)"
            variant="outline"
            size="icon"
            class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon name="lucide:copy" class="w-4 h-4" />
          </Button>
          <Button
            @click="shareTo(SocialPlatform.FACEBOOK, post.slug, post.excerpt)"
            variant="outline"
            size="icon"
            class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon name="lucide:facebook" class="w-4 h-4" />
          </Button>
          <Button
            @click="shareTo(SocialPlatform.X, post.slug, post.excerpt)"
            variant="outline"
            size="icon"
            class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </Button>
          <Button
            @click="shareTo(SocialPlatform.LINKEDIN, post.slug, post.excerpt)"
            variant="outline"
            size="icon"
            class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon name="lucide:linkedin" class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
