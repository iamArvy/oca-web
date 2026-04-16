<script setup>
const config = useRuntimeConfig()
if (config.public.adsenseClient) {
  useHead({
    script: [
      {
        async: true,
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsenseClient}`,
        crossorigin: "anonymous",
      },
    ],
  });
}
</script>

<template>

</template>
