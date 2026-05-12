<script setup lang="ts">
import { Play } from "lucide-vue-next";
import { APP_ROUTES } from "~/constants";
import { PostType } from "~/enums";
import type { Post } from "~/interfaces";

interface Props {
  post: Post;
  skeleton?: boolean
}

const props = defineProps<Props>();

const isHovering = ref(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);
function handleMouseEnter() {
  isHovering.value = true;

  if (iframeRef.value && props.post.type === PostType.VIDEO) {
    iframeRef.value.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  }
}

function handleMouseLeave() {
  isHovering.value = false;

  if (iframeRef.value) {
    iframeRef.value.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }
}
</script>
<template>
  <article class="bg-card rounded-2xl overflow-hidden card-interactive h-full" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div class="relative overflow-hidden aspect-16/10">
      <div v-if="post.type === PostType.VIDEO"
        class="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
        <Play class="w-3 h-3 fill-current" />
      </div>
      <template v-if="isHovering && post.type === PostType.VIDEO">
        <iframe ref="iframeRef" :src="post.content + '?enablejsapi=1&controls=0&rel=0&mute=1'"
          class="absolute inset-0 w-full h-full object-cover" frameborder="0" allow="autoplay; encrypted-media"
          allowfullscreen />
      </template>
      <NuxtImg v-else :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>

    <p class="p-3">
      <span class="flex items-center text-primary text-xs md:text-sm mb-1 space-x-1 line-clamp-2">
        <NuxtLink :to="APP_ROUTES.topic.path(post.topic.slug)" class="hover:underline inline">
          {{ props.post.topic.name }}
        </NuxtLink>
        <span class="inline mx-1">
          |
        </span>
        <span class="inline">
          {{ formatDateCompact(post.createdAt) }} ago
        </span>
      </span>
      <NuxtLink :to="APP_ROUTES.post.path(post.slug)"
        class="text-sm lg:text-base font-display font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
        {{ props.post.title }}
      </NuxtLink>

      <!-- Work on filter for author -->
      <span v-if="post.author" class="flex items-center text-xs text-foreground gap-1">
        <NuxtImg v-if="post.author.avatar" :src="post.author.avatar" :alt="post.author.name"
          class="w-3 h-3 rounded-full" />
        <Icon v-else name="lucide:user" class="w-3 h-3" />
        {{
          post.author.name
        }}
      </span>
      <NuxtLink :to="APP_ROUTES.source.path(post.feed.slug)" v-else-if="post.feed"
        class="flex items-center gap-1 hover:underline text-xs text-foreground">
        <NuxtImg v-if="post.feed.image" :src="post.feed.image" :alt="post.feed.name" class="w-3 h-3 rounded-full" />
        <Icon v-else name="lucide:rss" class="w-3 h-3" />
        {{
          post.feed.name
        }}
      </NuxtLink>
    </p>
  </article>
</template>