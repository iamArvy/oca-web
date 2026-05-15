<script setup lang="ts">
const { isMobile } = useMobile('lg')
</script>
<template>
  <div v-if="isMobile" class="space-y-4">
    <PostCardPlaceholder v-for="n in 6" :key="n" />
  </div>
  <div v-else :class="`grid grid-cols-2 lg:grid-cols-3 gap-6 stagger-children`">
    <PostCardPlaceholder v-for="n in 6" :key="n" variant="grid" />
  </div>
</template>