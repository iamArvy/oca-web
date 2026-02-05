<script setup lang="ts">
import { ref } from "vue";
import { Heart, Reply, MoreHorizontal } from "lucide-vue-next";
import type { Comment } from "~/types";
interface Props {
  comment: Comment;
}

const props = defineProps<Props>();

const liked = ref(false);
const showReplyForm = ref(false);

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
</script>

<template>
  <div class="flex gap-3" :class="comment.parentId ? 'ml-12' : ''">
    <!-- Avatar -->
    <Avatar class="w-10 h-10 shrink-0">
      <template v-if="comment.avatar">
        <AvatarImage :src="comment.avatar" :alt="comment.author" />
      </template>
      <AvatarFallback class="bg-primary text-primary-foreground text-sm">
        {{ comment.author.charAt(0) }}
      </AvatarFallback>
    </Avatar>

    <!-- Content -->
    <div class="flex-1 space-y-2">
      <div class="bg-muted/50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm">{{ comment.author }}</span>
            <span class="text-xs text-muted-foreground">{{ formatDate(comment.date) }}</span>
          </div>
          <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground">
            <MoreHorizontal class="w-4 h-4" />
          </Button>
        </div>
        <p class="text-sm text-foreground leading-relaxed">{{ comment.content }}</p>
      </div>

      <div class="flex items-center gap-4 px-2">
        <button @click="liked = !liked" :class="[
          'flex items-center gap-1.5 text-xs transition-colors',
          liked ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
        ]">
          <Heart :class="['w-4 h-4', liked && 'fill-current']" />
          {{ comment.likes + (liked ? 1 : 0) }}
        </button>
        <button @click="showReplyForm = !showReplyForm"
          class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Reply class="w-4 h-4" />
          Reply
        </button>
      </div>

      <!-- Reply form -->
      <div v-if="showReplyForm" class="flex gap-3 mt-3">
        <Avatar class="w-8 h-8 shrink-0">
          <AvatarFallback class="bg-primary/20 text-primary text-xs">U</AvatarFallback>
        </Avatar>
        <div class="flex-1 space-y-2">
          <Textarea placeholder="Write a reply..." class="min-h-[60px] resize-none bg-muted/30" />
          <div class="flex justify-end gap-2">
            <Button variant="ghost" size="sm" @click="showReplyForm = false">
              Cancel
            </Button>
            <Button size="sm" class="bg-gradient-hero hover:opacity-90">
              Reply
            </Button>
          </div>
        </div>
      </div>

      <!-- Replies -->
      <div v-if="comment.replies?.length" class="space-y-4 mt-4">
        <CommentItem v-for="reply in comment.replies" :key="reply.id" :comment="reply" :isReply="true" />
      </div>
    </div>
  </div>
</template>
