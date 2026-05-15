<script setup lang="ts">
import { APP_ROUTES } from '~/constants';

interface Props {
  tags: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h3 class="font-display text-lg font-bold mb-4">Trending Tags</h3>
    <div class="flex flex-wrap gap-2">
      <NuxtLink v-for="tag in tags" :key="tag" :to="APP_ROUTES.tags.path(tag.toLowerCase().replace(/\s+/g, '-'))"
        class="px-3 py-1.5 text-xs font-medium rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>