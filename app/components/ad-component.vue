<script setup lang="ts">
import { API_ROUTES } from "~/constants";
import { AdContentType, type Ads, type ApiListResponse } from "~/interfaces";

interface AdPlacementProps {
  size: "banner" | "sidebar" | "inline";
}

const props = defineProps<AdPlacementProps>();

const sizeClasses = {
  banner: "h-24 md:h-32",
  sidebar: "h-64",
  inline: "h-20",
};

const { data } = useAPI<ApiListResponse<Ads>>(API_ROUTES.ads.path);

const ads = computed(() => data.value?.data ?? []);

const typeMap = {
  banner: "banner",
  sidebar: "sidebar",
  inline: "feed",
};

const filteredAds = computed(() =>
  ads.value.filter((ad) => ad.placement === typeMap[props.size]),
);

const currentIndex = ref(0);
const currentAd = computed(() => filteredAds.value[currentIndex.value]);

onMounted(() => {
  setInterval(() => {
    if (filteredAds.value.length <= 1) return;

    currentIndex.value = (currentIndex.value + 1) % filteredAds.value.length;
  }, 6000);
});
</script>

<template>
  <div v-if="currentAd">
    <NuxtLink
      :to="currentAd.target"
      target="_blank"
      rel="noopener noreferrer"
      class="block rounded-lg overflow-hidden relative group"
      :class="sizeClasses[size]"
    >
      <img
        v-if="currentAd.contentType === AdContentType.IMAGE"
        :src="currentAd.content"
        :alt="currentAd.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        v-else-if="currentAd.contentType === AdContentType.HTML"
        class="w-full h-full p-4 flex items-center justify-center"
        v-html="currentAd.content"
      />
      <video
        v-else-if="currentAd.contentType === AdContentType.VIDEO"
        :src="currentAd.content"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
      />

      <div
        class="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <span
        class="absolute top-1 right-1 text-[9px] px-1.5 py-0.5 rounded bg-foreground/60 text-background font-medium"
      >
        AD
      </span>
    </NuxtLink>
  </div>

  <!-- Placeholder -->
  <div
    v-else
    :class="sizeClasses[size]"
    class="ad-placeholder flex items-center justify-center"
  >
    <div class="text-center">
      <p class="font-medium">Advertisement</p>
      <p class="text-xs opacity-70">Your ad here</p>
    </div>
  </div>
</template>
