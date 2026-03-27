<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { Topic, Topics } from '~/interfaces';

// const { currentCategory } = useCategory()
interface Props {
  topics: Topics,
}

defineProps<Props>()
const currentTopic = ref<Topic | null>(null)

function onMouseEnter(topic: Topic) {
  currentTopic.value = topic
}

function onMouseLeave() {
  currentTopic.value = null
}
</script>
<template>
  <div>
    <nav @mouseleave="onMouseLeave">
      <ul class="flex space-x-4 overflow-x-auto">
        <li v-for="item in topics" :key="item.id" @mouseover="onMouseEnter(item)">
          <LayoutNav :label="item.name" :value="APP_ROUTES.topic.path(item.slug)"
            :active="currentTopic?.slug === item.slug" :hasChildren="item.children && item.children.length > 0" />
        </li>
      </ul>
      <ul class="flex space-x-4 overflow-x-auto mt-1 transition-all duration-300"
        v-if="currentTopic && currentTopic.children && currentTopic.children.length > 0">
        <li v-for="child in currentTopic.children" :key="child.id">
          <LayoutNav :label="child.name" :value="APP_ROUTES.topic.path(child.slug)" />
        </li>
      </ul>
    </nav>
  </div>
</template>