<script setup lang="ts">
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, LiveSources } from "~/interfaces";

const { settings, emblaMainApi, selectedIndex } = useHeroCarousel();

const { data: liveStreams } = useAPI<ApiListResponse<LiveSources>>(API_ROUTES.liveSources.path, { query: { limit: 5 } });

const items = computed(() => {
  const merged = [
    ...(liveStreams.value?.data || [{ id: "default-id", name: "Channels TV", source: "https://www.youtube.com/embed/d4zDorDl5UE" }])
  ];

  return Array.from(
    new Map(merged.map(item => [item.id, item])).values()
  );
});
</script>

<template>
  <section class="relative">
    <Carousel v-bind="settings" @init-api="(val) => (emblaMainApi = val)" class="relative group">
      <div
        class="absolute z-5 w-full top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center justify-between px-2 transition-all ease-in-out duration-500">
        <CarouselPrevious variant="outline" />
        <CarouselNext />
      </div>
      <CarouselContent>
        <CarouselItem v-for="item in items" :key="item.id">
          <EmbedItem :source="item.source" />
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
