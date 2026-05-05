<script setup lang="ts">
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, LiveSources } from "~/interfaces";

const { settings, emblaMainApi, selectedIndex } = useHeroCarousel();

const { data: liveStreams } = useAPI<ApiListResponse<LiveSources>>(API_ROUTES.liveSources.path, { query: { limit: 5 } });

// const items = computed(() => {
//   const merged = [
//     ...(liveStreams.value?.data || [{ id: "default-id", name: "Channels TV", source: "https://www.youtube.com/embed/d4zDorDl5UE" }])
//   ];

//   return Array.from(
//     new Map(merged.map(item => [item.id, item])).values()
//   );
// });
</script>

<template>
  <section class="relative">
    <Carousel v-bind="settings" @init-api="(val) => (emblaMainApi = val)" class="group">
      <div class="flex items-center">
        <div class="flex-1 mb-6 relative">
          <h2 class="font-display text-2xl md:text-3xl font-bold ">Live News</h2>
          <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
        </div>
        <div class="flex items-center justify-end gap-1 mb-4">
          <CarouselPrevious variant="outline" />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent>
        <CarouselItem v-for="item in liveStreams?.data" :key="item.id">
          <EmbedItem :source="item.source" />
        </CarouselItem>
      </CarouselContent>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <button v-for="(_, index) in liveStreams?.data" :key="index" class="w-2 h-2 rounded-full transition-all" :class="index === selectedIndex
          ? 'w-8 bg-primary'
          : 'bg-white/50 hover:bg-white/70'
          " />
      </div>
    </Carousel>
  </section>
</template>
