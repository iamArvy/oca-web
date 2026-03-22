<script setup lang="ts">
import { Play } from "lucide-vue-next";
import { APP_ROUTES } from "~/constants";
import { PostType } from "~/enums";
import type { Post } from "~/interfaces";

interface Props {
  post: Post;
  variant?: "default" | "featured" | "compact";
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
  <PostCardFeatured v-if="props.variant === 'featured'" :post="props.post" />

  <PostCardCompact v-else-if="props.variant === 'compact'" :post="props.post" />

  <NuxtLink v-else :to="APP_ROUTES.post.path(post.slug)" class="group block" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <article class="bg-card rounded-2xl overflow-hidden card-interactive h-full">
      <div class="relative overflow-hidden aspect-16/10">
        <!-- <template v-if="props.post.type === PostType.VIDEO">
          <img :src="props.post.image" :alt="props.post.title" :class="[
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            isHovering ? 'opacity-0' : 'opacity-100',
          ]" />
          <video ref="videoRef" :src="props.post.content" :class="[
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            isHovering ? 'opacity-100' : 'opacity-0',
          ]" muted loop playsinline />
          <div :class="[
            'absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium transition-opacity duration-300',
            isHovering ? 'opacity-0' : 'opacity-100',
          ]">
            <Play class="w-3 h-3 fill-current" />
            Video
          </div>
        </template>
<template v-else>
          <NuxtImg :src="props.post.image" :alt="props.post.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </template> -->

        <NuxtImg :src="props.post.image" :alt="props.post.title" placeholder="/oca-placeholder.png"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div v-if="props.post.isTrending"
          class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
          <Icon name="lucide:trending-up" class="w-3 h-3" />
          TRENDING
        </div>
      </div>

      <div class="p-5">
        <span class="category-pill mb-3">{{ props.post.topic.name }}</span>
        <h3 class="font-display text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {{ props.post.title }}
        </h3>
        <p class="text-foreground text-sm mb-4 line-clamp-2">
          {{ props.post.excerpt }}
        </p>

        <div class="flex items-center justify-between text-xs text-foreground">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
              <Icon name="lucide:user" class="w-3 h-3" />
              {{ post.author?.name ?? post.external?.source ?? "Guest" }}
            </span>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
