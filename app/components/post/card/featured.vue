<script setup lang="ts">
import { Play } from "lucide-vue-next";
import { APP_ROUTES } from "~/constants";
import { PostType } from "~/enums";
import type { Post } from "~/interfaces";

interface Props {
  post: Post;
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
  <article @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    class="relative h-100 md:h-125 rounded-2xl overflow-hidden card-interactive">
    <template v-if="post.type === PostType.VIDEO">
      <iframe ref="iframeRef" :src="post.content + '?enablejsapi=1&controls=0&rel=0'"
        class="absolute inset-0 w-full h-full object-cover" frameborder="0" allow="autoplay; encrypted-media"
        allowfullscreen />
      <div
        class="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
        <Play class="w-3 h-3 fill-current" />
        Video
      </div>
    </template>
    <NuxtImg v-else :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <div class="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white space-y-2 md:space-y-3 mb-5">
      <div class="flex">
        <NuxtLink :to="APP_ROUTES.topic.path(post.topic.slug)"
          class="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">
          {{ props.post.topic.name }}
        </NuxtLink>
      </div>
      <NuxtLink :to="APP_ROUTES.post.path(post.slug)"
        class="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight hover:text-primary line-clamp-2">
        {{ props.post.title }}
      </NuxtLink>
      <div class="flex items-center gap-4 text-sm text-white/70">
        <span v-if="post.author" class="flex items-center gap-1.5">
          <NuxtImg v-if="post.author.avatar" :src="post.author.avatar" class="w-4 h-4 rounded-full" />
          <Icon v-else name="lucide:user" class="w-4 h-4" />
          {{
            post.author.name
          }}
        </span>
        <NuxtLink :to="APP_ROUTES.source.path(post.feed.slug)" v-else-if="post.feed"
          class="flex items-center gap-1.5 hover:underline">
          <NuxtImg v-if="post.feed.image" :src="post.feed.image" class="w-4 h-4 rounded-full" />
          <Icon v-else name="lucide:rss" class="w-4 h-4" />
          {{
            post.feed.name
          }}
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
