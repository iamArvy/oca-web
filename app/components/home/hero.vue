<script setup lang="ts">
import { API_ROUTES } from "~/constants";
import { PostType } from "~/enums";
import type { ApiListResponse, Posts } from "~/interfaces";

// const trendingPosts = computed(() => props.posts.filter((p) => p.trending));

const { settings, emblaMainApi, selectedIndex } = useHeroCarousel();

const { data: posts } = useAPI<ApiListResponse<Posts>>(API_ROUTES.posts.path, { query: { collection: 'featured-posts' } });
const { data: videos } = useAPI<ApiListResponse<Posts>>(API_ROUTES.posts.path, { query: { type: PostType.VIDEO, limit: 5 } });

const items = computed(() => {
  const merged = [
    ...(posts.value?.data || []),
    ...(videos.value?.data || [])
  ];

  return Array.from(
    new Map(merged.map(item => [item.id, item])).values()
  );
});
</script>

<template>
  <section v-if="posts?.data && posts.data.length > 0" class="relative">
    <Carousel v-bind="settings" @init-api="(val) => (emblaMainApi = val)" class="relative group">
      <div
        class="absolute z-5 w-full top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center justify-between px-2 transition-all ease-in-out duration-500">
        <CarouselPrevious variant="outline" />
        <CarouselNext />
      </div>
      <CarouselContent>
        <CarouselItem v-for="post in items" :key="post.id">
          <PostCard :post="post" variant="featured" />
        </CarouselItem>
      </CarouselContent>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <button v-for="(_, index) in items" :key="index" class="w-2 h-2 rounded-full transition-all" :class="index === selectedIndex
          ? 'w-8 bg-primary'
          : 'bg-white/50 hover:bg-white/70'
          " />
      </div>
    </Carousel>
  </section>
</template>
