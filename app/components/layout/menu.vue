<script setup lang="ts">
import { API_ROUTES, APP_ROUTES } from '~/constants';
import { ChevronRight } from 'lucide-vue-next'
import type { ApiListResponse, Topic } from '~/types';

const currentTopic = ref<Topic | null>(null)

function onMouseEnter(topic: Topic) {
  currentTopic.value = topic
}

function onMouseLeave() {
  currentTopic.value = null
}

const { data: topics } = await useAPI<ApiListResponse<Topic>>(API_ROUTES.public.topics, {
  query: {
    limit: 7,
    isFeatured: 'true',
    isRootParent: 'true',
  }
})

const { isMobile } = useMobile('lg')

</script>
<template>
  <nav @mouseleave="onMouseLeave" class="w-full overflow-x-auto">
    <ul v-if="topics" class="flex space-x-4 overflow-x-auto scrollbar-hide items-center">
      <li v-for="item in topics.data" :key="item.id" @mouseover="onMouseEnter(item)" class="shrink-0">
        <LayoutNav :label="item.name" :value="APP_ROUTES.topic(item.slug)" :active="currentTopic?.slug === item.slug"
          :hasChildren="item.children && item.children.length > 0" />
      </li>
      <li>
        <LayoutMobileMenu :topics="topics">
          <Button variant="outline" size="sm" class="text-xs">
            <span v-if="!isMobile" class="hidden md:flex">View Topics</span>
            <ChevronRight class="size-3" />
          </Button>
        </LayoutMobileMenu>
      </li>
    </ul>
    <ul class="flex space-x-4 overflow-x-auto mt-1 transition-all duration-300 scrollbar-hide"
      v-if="currentTopic && currentTopic.children && currentTopic.children.length > 0">
      <li v-for="child in [...currentTopic.children]
        .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
        .slice(0, 7)" :key="child.id" class="shrink-0">
        <LayoutNav :label="child.name" :value="APP_ROUTES.topic(child.slug)" />
      </li>
    </ul>
  </nav>
</template>