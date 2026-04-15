<script setup lang="ts">

interface Props {
  items: FeedItem[],
}

const props = defineProps<Props>()

</script>

<template>
  <div class="space-y-2">
    <PostCardPlaceholder v-for="n in 6" :key="n" variant="list" />
  </div>
</template>