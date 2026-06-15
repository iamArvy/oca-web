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
