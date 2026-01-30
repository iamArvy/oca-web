<script setup lang="ts">
// const { name } = useAppConfig()

useHead({
  script: [
    {
      innerHTML: getThemeInitScript(),
      tagPosition: "head",
    },
  ],
  // titleTemplate: (titleChunk) => {
  //   return titleChunk ? `${titleChunk} - ${name}` : name
  // }
});


</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
