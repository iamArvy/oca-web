<script setup lang="ts">
interface Props {
  icon: Component;
  label: string;
}

defineProps<Props>();
</script>
<template>
  <h3 class="font-display text-lg font-bold flex items-center gap-2">
    <component :is="icon" class="w-5 h-5 text-primary" /> {{ label }}
  </h3>
</template>
