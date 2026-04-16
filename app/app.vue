<script setup lang="ts">
import "vue-sonner/style.css";
const config = useRuntimeConfig()

useHead({
  script: [
    {
      innerHTML: getThemeInitScript(),
      tagPosition: "head",
    },
    {
      async: true,
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsenseClient}`,
      crossorigin: "anonymous",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <!-- <GoogleAdsense /> -->
    <GoogleTagManager />
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <LinkedinAnalytics />
</template>
