<script setup lang="ts">
import type { Post } from '~/interfaces';


interface Props {
  items: FeedItem<Post>[],
}

const props = defineProps<Props>()

</script>
<template>
  <div :class="`grid grid-cols-2 lg:grid-cols-3 gap-6 stagger-children`">
    <template v-for="(item, index) in props.items" :key="index">
      <PostCard v-if="item.type === 'item' && item.item" :post="item.item" variant="grid" />

      <div v-else class="col-span-2 lg:col-span-3">
        <AdComponent size="inline" />
      </div>
    </template>
  </div>
</template>