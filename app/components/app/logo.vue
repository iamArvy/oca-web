<script setup lang="ts">
interface Props {
  icon?: boolean;
  variant?: 'dark' | 'light'
}

withDefaults(
  defineProps<Props>(), {
  icon: false,
  variant: 'light'
}
)
</script>
<template>
  <NuxtImg v-if="icon" src="/icon.webp" />
  <NuxtImg v-else :src="variant === 'dark' ? '/logo.webp' : '/logo-white.png'" alt="OneClick Africa Logo" />
</template>