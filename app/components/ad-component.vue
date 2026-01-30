<script setup lang="ts">
interface AdPlacementProps {
  size: 'banner' | 'sidebar' | 'inline';
}

const sizeClasses = {
  banner: 'h-24 md:h-32',
  sidebar: 'h-64',
  inline: 'h-20',
};

defineProps<AdPlacementProps>()
</script>
<template>
  <div :class="sizeClasses[size]" class="ad-placeholder">
    <div class="text-center">
      <p class="font-medium">Advertisement</p>
      <p class="text-xs opacity-70">Your ad here</p>
    </div>
  </div>
</template>