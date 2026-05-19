<script setup lang="ts">
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, LiveSource } from "~/interfaces";

const { settings, emblaMainApi } = useHeroCarousel();

const { data: liveStreams } = useAPI<ApiListResponse<LiveSource>>(API_ROUTES.liveSources.path);
</script>

<template>
  <section v-if="liveStreams && liveStreams.data.length > 0" class="relative">
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
          <EmbedItem :title="item.name" :source="item.source" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </section>
</template>
