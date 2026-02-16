<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import type { Categories, Category } from '~/types';

// const { currentCategory } = useCategory()
interface Props {
  categories: Categories,
}

defineProps<Props>()
const currentCategory = ref<Category | null>(null)

function onMouseEnter(category: Category) {
  currentCategory.value = category
}

function onMouseLeave() {
  currentCategory.value = null
}
</script>
<template>
  <div>
    <nav @mouseleave="onMouseLeave">
      <ul class="flex space-x-4 overflow-x-auto">
        <li v-for="category in categories" :key="category.id" @mouseover="onMouseEnter(category)">
          <LayoutNav :label="category.name" :value="APP_ROUTES.category.path(category.slug)"
            :active="currentCategory?.slug === category.slug" />
        </li>
      </ul>
      <ul class="flex space-x-4 overflow-x-auto mt-1"
        v-if="currentCategory && currentCategory.subcategories && currentCategory.subcategories.length > 0">
        <li v-for="subcategory in currentCategory.subcategories" :key="subcategory.id">
          <LayoutNav :label="subcategory.name"
            :value="APP_ROUTES.subcategory.path(currentCategory.slug, subcategory.slug)" />
        </li>
      </ul>
    </nav>
  </div>
</template>