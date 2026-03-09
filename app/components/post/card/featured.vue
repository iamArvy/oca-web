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
const videoRef = ref<HTMLVideoElement | null>(null);

function handleMouseEnter() {
  isHovering.value = true;
  if (videoRef.value && props.post.type === PostType.VIDEO) {
    videoRef.value.play().catch(() => { });
  }
}

function handleMouseLeave() {
  isHovering.value = false;
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  }
}
</script>

<template>
  <NuxtLink @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" :to="APP_ROUTES.post.path(post.slug)"
    class="group block">
    <article class="relative h-100 md:h-125 rounded-2xl overflow-hidden card-interactive">
      <template v-if="post.type === PostType.VIDEO">
        <!-- <iframe :src="post.content" class="absolute inset-0 w-full h-full object-cover" muted loop playsInline
          frameborder="0" allow="autoplay; encrypted-media" autoPlay /> -->
        <!-- <video src=""></video> -->
        <video ref="videoRef" :src="props.post.content" :class="[
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
          isHovering ? 'opacity-100' : 'opacity-0',
        ]" muted loop playsinline />
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
        <div v-if="props.post.isTrending"
          class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary rounded-full text-xs font-bold">
          <Icon name="lucide:trending-up" class="w-3 h-3" />
          TRENDING
        </div>
        <span class="inline-block px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">
          {{ props.post.topic.name }}
        </span>
        <h2 class="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-colors">
          {{ props.post.title }}
        </h2>
        <p class="text-white/80 line-clamp-2 text-sm md:text-base">
          {{ props.post.excerpt }}
        </p>
        <div class="flex items-center gap-4 text-sm text-white/70">
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:user" class="w-4 h-4" />
            {{ post.author?.name ?? post.external?.source }}
          </span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
