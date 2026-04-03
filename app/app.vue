<script setup lang="ts">
import "vue-sonner/style.css";

useHead({
  script: [
    {
      innerHTML: getThemeInitScript(),
      tagPosition: "head",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <GoogleTagManager />
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
