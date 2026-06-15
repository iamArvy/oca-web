<script setup lang="ts">
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
      async: true,
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsenseClient}`,
      crossorigin: "anonymous",
    },
  ],
});

</script>

<template>
  <div class="min-h-screen bg-background">
    <LayoutHeader />
    <slot />
    <LayoutFooter />
  </div>
</template>