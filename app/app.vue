<script setup lang="ts">
import 'vue-sonner/style.css'; // vue-sonner v2 requires this import

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
  <!-- <Transition name="slide" mode="out-in">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Transition> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
