<script setup lang="ts">
import type { Post } from '~/interfaces';

interface Props {
  items: FeedItem<Post>[],
}

const props = defineProps<Props>()

</script>

<template>
  <div class="space-y-2">
    <template v-for="(item, index) in items" :key="index">
      <PostCard v-if="item.type === 'item' && item.item" :post="item.item" variant="list" />
      <AdComponent v-else size="inline" />
    </template>
  </div>
</template>