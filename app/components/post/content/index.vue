<script setup lang="ts">
import { PostType } from '~/types';

interface Props {
  type: PostType,
  content: string
}
defineProps<Props>()

</script>

<template>
  <div class="content-wrapper">
    <PostContentEmbedded v-if="type === PostType.EMBEDDED" :link="content" />
    <PostContentArticle v-else-if="type === PostType.ARTICLE" :html-content="content" />
    <PostContentVideo v-else-if="type === PostType.VIDEO" :video-url="content" />
    <PostContentAudio v-else-if="type === PostType.AUDIO" :audio-url="content" />
  </div>
</template>