<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { Posts } from '~/types'

interface Props {
  posts: Posts
}

const props = defineProps<Props>()

const currentIndex = ref(0)
const trendingPosts = computed(() => props.posts.filter((p) => p.trending))

let interval: NodeJS.Timeout | null = null

onMounted(() => {
  if (trendingPosts.value.length > 0) {
    interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % trendingPosts.value.length
    }, 5000)
  }
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

function goToPrevious() {
  const total = trendingPosts.value.length
  currentIndex.value = (currentIndex.value - 1 + total) % total
}

function goToNext() {
  const total = trendingPosts.value.length
  currentIndex.value = (currentIndex.value + 1) % total
}
</script>

<template>
  <section v-if="trendingPosts.length" class="relative">
    <div class="overflow-hidden rounded-2xl">
      <div class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="post in trendingPosts" :key="post.id" class="w-full shrink-0">
          <PostCard :post="post" variant="featured" />
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <Button variant="ghost" size="icon"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
      @click="goToPrevious">
      <Icon name="lucide:chevron-left" class="w-5 h-5" />
    </Button>

    <Button variant="ghost" size="icon"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
      @click="goToNext">
      <Icon name="lucide:chevron-right" class="w-5 h-5" />
    </Button>

    <!-- Dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      <button v-for="(_, index) in trendingPosts" :key="index" @click="currentIndex = index" :class="[
        'w-2 h-2 rounded-full transition-all',
        index === currentIndex
          ? 'w-8 bg-primary'
          : 'bg-primary-foreground/50 hover:bg-primary-foreground/70'
      ]" />
    </div>
  </section>
</template>
