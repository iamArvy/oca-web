<script setup lang="ts">
import { computed } from 'vue'
import type { Posts } from '~/types'

interface Props {
  posts: Posts
}

const props = defineProps<Props>()

const trendingPosts = computed(() => props.posts.filter((p) => p.trending))

const { settings, emblaMainApi, selectedIndex } = useHeroCarousel();
</script>

<template>
  <section v-if="trendingPosts.length" class="relative">
    <Carousel v-bind="settings" @init-api="(val) => emblaMainApi = val" class="relative group">
      <div
        class="absolute z-5 w-full top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center justify-between px-2 transition-all ease-in-out duration-500">
        <CarouselPrevious variant="outline" />
        <CarouselNext />
      </div>
      <CarouselContent>
        <CarouselItem v-for="post in trendingPosts" :key="post.id">
          <PostCard :post="post" variant="featured" />
        </CarouselItem>
      </CarouselContent>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <button v-for="(_, index) in trendingPosts" :key="index" class="w-2 h-2 rounded-full transition-all" :class="index === selectedIndex
          ? 'w-8 bg-primary'
          : 'bg-primary-foreground/50 hover:bg-primary-foreground/70'" />
      </div>
    </Carousel>
  </section>
</template>
