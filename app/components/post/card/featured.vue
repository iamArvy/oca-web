<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { Post } from '~/types'

interface Props {
  post: Post
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="APP_ROUTES.post.path(post.slug)" class="group block">
    <article class="relative h-100 md:h-125 rounded-2xl overflow-hidden card-interactive">
      <template v-if="post.videoThumbnail">
        <video :src="post.videoThumbnail" class="absolute inset-0 w-full h-full object-cover" muted loop playsInline
          autoPlay />
        <div
          class="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
          <Play class="w-3 h-3 fill-current" />
          Video
        </div>
      </template>
      <NuxtImg v-else :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div class="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent" />

      <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-primary-foreground">
        <div v-if="props.post.trending"
          class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary rounded-full text-xs font-bold mb-4">
          <Icon name="lucide:trending-up" class="w-3 h-3" />
          TRENDING
        </div>
        <span class="inline-block px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium mb-3">
          {{ props.post.category.name }}
        </span>
        <h2
          class="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
          {{ props.post.title }}
        </h2>
        <p class="text-primary-foreground/80 mb-4 line-clamp-2 text-sm md:text-base">
          {{ props.post.excerpt }}
        </p>
        <div class="flex items-center gap-4 text-sm text-primary-foreground/70">
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:user" class="w-4 h-4" />
            {{ props.post.author.name }}
          </span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>