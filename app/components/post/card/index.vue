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
  <!-- FEATURED VARIANT -->
  <NuxtLink v-if="props.variant === 'featured'" :to="APP_ROUTES.post.path(post.slug)" class="group block">
    <article class="relative h-100 md:h-125 rounded-2xl overflow-hidden card-interactive">
      <NuxtImg :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
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

  <!-- COMPACT VARIANT -->
  <NuxtLink v-else-if="props.variant === 'compact'" :to="APP_ROUTES.post.path(post.slug)" class="group block">
    <article class="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
      <NuxtImg :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
        class="w-20 h-20 object-cover rounded-lg shrink-0" />
      <div class="flex-1 min-w-0">
        <span class="text-xs font-medium text-primary">
          {{ props.post.category.name }}
        </span>
        <h3 class="font-semibold text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">
          {{ props.post.title }}
        </h3>
        <div class="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Icon name="lucide:user" class="w-3 h-3" />
          {{ props.post.author.name }}
        </div>
      </div>
    </article>
  </NuxtLink>

  <!-- DEFAULT VARIANT -->
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
