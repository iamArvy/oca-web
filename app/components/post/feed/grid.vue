<script setup lang="ts">

interface Props {
  items: FeedItem[],
}

const props = defineProps<Props>()

</script>
<template>
  <div :class="`grid grid-cols-2 lg:grid-cols-3 gap-6 stagger-children`">
    <template v-for="(item, index) in props.items" :key="index">
      <PostCard v-if="item.type === 'post' && item.post" :post="item.post" />

      <div v-else class="col-span-2 lg:col-span-3">
        <AdComponent size="inline" />
      </div>
    </template>
  </div>
</template>