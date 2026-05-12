<script setup lang="ts">
import "vue-sonner/style.css";
const config = useRuntimeConfig()

useHead({
  link: [
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
    {
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
  ],
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

// const { fetchUser } = useAuth()
// onMounted(() => fetchUser())
</script>

<template>
  <NuxtLayout>
    <GoogleTagManager />
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <LinkedinAnalytics />
</template>
