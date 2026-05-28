<script setup lang="ts">
import { ref } from "vue";
import type { Comment } from "~/interfaces";

interface Props {
  comment: Comment;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex gap-3">
    <Avatar class="w-10 h-10 shrink-0">
      <AvatarImage :src="comment.author.avatar ?? ''" :alt="comment.author.name" />
      <AvatarFallback class="bg-primary text-primary-foreground text-sm">
        {{ getInitials(comment.author.name) }}
      </AvatarFallback>
    </Avatar>

    <div class="flex-1 space-y-2">
      <div class="bg-muted/50 rounded-xl p-4 space-y-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm">{{ comment.author.name }}</span>
            <span class="text-xs text-muted-foreground">{{ formatDate(comment.createdAt) }}</span>
          </div>
        </div>
        <p class="text-sm text-foreground leading-relaxed">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>
