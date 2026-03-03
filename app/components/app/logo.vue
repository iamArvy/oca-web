<script setup lang="ts">
const { currentTheme } = useTheme()
</script>
<template>
  <img :src="currentTheme === 'light' ? '/logo.webp' : '/logo-white.png'" alt="">
</template>