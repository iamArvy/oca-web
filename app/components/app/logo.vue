<script setup lang="ts">
const { currentTheme } = useTheme()
</script>
<template>
  <img :src="currentTheme === 'dark' ? '/logo-white.png' : '/logo.webp'" alt="OneClick Africa Logo">
</template>