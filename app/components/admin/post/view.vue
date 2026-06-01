<script setup lang="ts">
import { BarChart3, Calendar, User, Rss } from "lucide-vue-next";

import type { PostAdminData } from "~/types";

defineProps<PostAdminData>();
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <div class="flex items-center gap-2">
        <template v-if="author">
          <User class="w-4 h-4" />{{ author.name }}
        </template>
        <template v-else-if="feed">
          <Rss class="w-4 h-4" />{{ feed.name }}
        </template>
      </div>
      <div class="flex items-center gap-2">
        <Calendar class="w-4 h-4" />{{
          new Date(createdAt).toLocaleDateString()
        }}
      </div>
      <div class="flex items-center gap-2">
        <BarChart3 class="w-4 h-4" />{{ views.toLocaleString() }}
        views
      </div>
    </div>
    <div v-if="image" class="rounded-xl overflow-hidden">
      <img :src="image" :alt="title" class="w-full h-64 object-cover" />
    </div>
    <h2 class="font-display text-2xl font-bold">{{ title }}</h2>
    <div class="prose prose-sm dark:prose-invert max-w-none" v-html="content" />
    <NuxtLink v-if="externalSourceUrl" :href="externalSourceUrl" target="__blank" class="underline italic">
      External Source URL
    </NuxtLink>
  </div>
</template>
