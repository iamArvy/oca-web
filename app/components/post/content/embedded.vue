<script setup lang="ts">

defineProps < {
  link: string
} > ();
</script>

<template>
  <div class="w-full h-64 md:h-96">
    <iframe :src="link" frameborder="0" allowfullscreen class="w-full h-full rounded-lg shadow-md" />
  </div>
</template>