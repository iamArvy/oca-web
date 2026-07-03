<script setup lang="ts">
const config = useRuntimeConfig()

const adsenseClient = config.public.adsenseClient;
const linkedinPartnerId = config.public.linkedinPartnerId;
const gtmId = config.public.googleTagManagerId;

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
    adsenseClient ? {
      async: true,
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`,
      crossorigin: "anonymous",
    } : undefined,
  ],
});

</script>

<template>
  <div class="min-h-screen bg-background">
    <GoogleTagManager v-if="gtmId" :id="gtmId" />
    <LayoutHeader />
    <slot />
    <LayoutFooter />
    <LinkedinAnalytics v-if="linkedinPartnerId" :id="linkedinPartnerId" />
  </div>
</template>