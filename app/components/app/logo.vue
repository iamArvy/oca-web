<script setup lang="ts">
interface Props {
  variant?: 'dark' | 'light'
}

withDefaults(
  defineProps<Props>(), {
  variant: 'light'
}
)
</script>
<template>
  <img :src="variant === 'dark' ? '/logo.webp' : '/logo-white.png'" alt="OneClick Africa Logo">
</template>