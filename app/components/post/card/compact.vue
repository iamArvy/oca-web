<script setup lang="ts">
import { APP_ROUTES } from "~/constants";
import type { Post } from "~/interfaces";

interface Props {
  post: Post;
}

const props = defineProps<Props>();
</script>

<template>
  <NuxtLink :to="APP_ROUTES.post.path(post.slug)" class="group block">
    <article class="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
      <NuxtImg :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
        class="w-20 h-20 object-cover rounded-lg shrink-0" />
      <div class="flex-1 min-w-0">
        <span class="text-xs font-medium text-primary">
          {{ props.post.topic.name }}
        </span>
        <h3 class="font-semibold text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">
          {{ props.post.title }}
        </h3>
        <div class="flex items-center gap-2 mt-2 text-xs">
          <Icon name="lucide:user" class="w-3 h-3" />
          {{
            props.post.author.name
          }}
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
