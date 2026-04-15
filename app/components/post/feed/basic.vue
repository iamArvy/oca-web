<script setup lang="ts">

interface Props {
  items: FeedItem[],
}

const props = defineProps<Props>()

</script>

<template>
  <div class="space-y-2">
    <template v-for="(item, index) in items" :key="index">
      <PostCard v-if="item.type === 'post' && item.post" :post="item.post" variant="list" />
      <AdComponent v-else size="inline" />
    </template>
  </div>
</template>