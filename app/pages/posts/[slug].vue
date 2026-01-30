<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { IPost, TPosts } from '~/types'
import placeholder from "~/assets/images/oca-placeholder.png"

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data } = await useFetch<{ post: IPost, relatedPosts: TPosts }>('/api/post', {
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
    <!-- Post Content -->
    <!-- Hero Image -->
    <div class="relative h-75 md:h-112.5 overflow-hidden">
      <NuxtImg :src="post.image" :alt="post.title" :placeholder="placeholder" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
    </div>

    <!-- Article Content -->
    <div class="container-lg -mt-32 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <article class="lg:col-span-2">
          <div class="bg-card rounded-2xl p-6 md:p-10 shadow-medium">
            <!-- Back Button -->
            <NuxtLink to="/"
              class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <Icon name="lucide:arrow-left" class="w-4 h-4" />
              Back to Home
            </NuxtLink>

            <!-- Category -->
            <span class="category-pill mb-4">{{ post.category }}</span>

            <!-- Title -->
            <h1 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {{ post.title }}
            </h1>

            <!-- Meta -->
            <div
              class="flex flex-wrap items-center gap-4 md:gap-6 pb-6 mb-6 border-b border-border text-sm text-muted-foreground">
              <span class="flex items-center gap-2">
                <Icon name="lucide:user" class="w-4 h-4" />
                {{ post.author }}
              </span>
              <span class="flex items-center gap-2">
                <Icon name="lucide:calendar" class="w-4 h-4" />
                {{
                  new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }}
              </span>
              <span class="flex items-center gap-2">
                <Icon name="lucide:clock" class="w-4 h-4" />
                {{ post.readTime }}
              </span>
              <span class="flex items-center gap-2">
                <Icon name="lucide:eye" class="w-4 h-4" />
                {{ post.views.toLocaleString() }} views
              </span>
            </div>

            <!-- Excerpt -->
            <p class="text-xl text-muted-foreground mb-6 leading-relaxed">
              {{ post.excerpt }}
            </p>

            <!-- Content -->
            <div class="prose prose-lg max-w-none">
              <p class="mb-4">{{ post.content }}</p>
              <p class="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
              <p class="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium.
              </p>
            </div>

            <!-- Read Original -->
            <div class="mt-8 p-6 bg-muted/50 rounded-xl">
              <p class="text-sm text-muted-foreground mb-3">
                This article was sourced from an external publication.
              </p>
              <Button class="gap-2 bg-gradient-hero hover:opacity-90">
                <Icon name="lucide:external-link" class="w-4 h-4" />
                Read Original Post
              </Button>
            </div>

            <!-- Share -->
            <div class="mt-8 pt-6 border-t border-border">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-2 text-sm font-medium">
                  <Icon name="lucide:share-2" class="w-4 h-4" />
                  Share this article
                </span>
                <div class="flex gap-2">
                  <Button variant="outline" size="icon"
                    class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon name="lucide:facebook" class="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon"
                    class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon name="lucide:twitter" class="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon"
                    class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon name="lucide:linkedin" class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="bg-card rounded-2xl p-6 md:p-10 mt-8 shadow-medium">
            <h3 class="font-display text-2xl font-bold mb-6">Comments</h3>
            <div class="text-center py-12 text-muted-foreground">
              <p class="mb-4">Join the conversation!</p>
              <Button class="bg-gradient-hero hover:opacity-90">
                Leave a Comment
              </Button>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <AdComponent size="sidebar" />

          <!-- Author Info -->
          <div class="bg-card rounded-2xl p-6 card-interactive">
            <h3 class="font-display text-lg font-bold mb-4">
              About the Author
            </h3>
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-display text-xl">
                {{ post.author.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold">{{ post.author }}</p>
                <p class="text-sm text-muted-foreground">Staff Writer</p>
              </div>
            </div>
          </div>

          <AdComponent size="sidebar" />
        </aside>
      </div>

      <!-- Related Posts -->
      <section v-if="relatedPosts.length" class="py-12">
        <h2 class="font-display text-2xl md:text-3xl font-bold mb-6 relative">
          Related Posts
          <span class="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-hero rounded-full" />
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          <PostCard v-for="relatedPost in relatedPosts" :key="relatedPost.id" :post="relatedPost" />
        </div>
      </section>
    </div>
  </main>
</template>
