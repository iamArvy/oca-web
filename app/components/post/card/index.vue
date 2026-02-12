<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { Post } from '~/types'


interface Props {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

const props = defineProps<Props>()
</script>

<template>
  <PostCardFeatured v-if="props.variant === 'featured'" :post="props.post" />

  <PostCardCompact v-else-if="props.variant === 'compact'" :post="props.post" />

  <NuxtLink v-else :to="APP_ROUTES.post.path(post.slug)" class="group block">
    <article class="bg-card rounded-2xl overflow-hidden card-interactive h-full">
      <div class="relative overflow-hidden aspect-16/10">
        <NuxtImg :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div v-if="props.post.trending"
          class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
          <Icon name="lucide:trending-up" class="w-3 h-3" />
          TRENDING
        </div>
      </div>

      <div class="p-5">
        <span class="category-pill mb-3">{{ props.post.category.name }}</span>
        <h3 class="font-display text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {{ props.post.title }}
        </h3>
        <p class="text-muted-foreground text-sm mb-4 line-clamp-2">
          {{ props.post.excerpt }}
        </p>

        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
              <Icon name="lucide:user" class="w-3 h-3" />
              {{ props.post.author.name }}
            </span>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
