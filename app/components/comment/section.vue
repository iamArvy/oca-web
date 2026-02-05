<script setup lang="ts">
import { ref, computed } from "vue";
import { comments as allComments } from "@/lib/mocks";

interface Props {
  postId: string;
}

const props = defineProps<Props>();
const newComment = ref("");

const postComments = computed(() =>
  allComments.filter((c) => c.postId === props.postId)
);
</script>

<template>
  <div class="bg-card rounded-2xl p-6 md:p-10 mt-8 shadow-medium">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-display text-2xl font-bold">
        Comments ({{ postComments.length }})
      </h3>
    </div>

    <!-- Add Comment -->
    <div class="flex gap-3 mb-8 pb-8 border-b border-border">
      <Avatar class="w-10 h-10 shrink-0">
        <AvatarFallback class="bg-primary/20 text-primary">U</AvatarFallback>
      </Avatar>
      <div class="flex-1 space-y-3">
        <Textarea placeholder="Join the conversation..." v-model="newComment"
          class="min-h-25 resize-none bg-muted/30" />
        <div class="flex justify-end">
          <Button class="bg-gradient-hero hover:opacity-90">
            Post Comment
          </Button>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div v-if="postComments.length" class="space-y-6">
      <CommentItem v-for="comment in postComments" :key="comment.id" :comment="comment" />
    </div>

    <div v-else class="text-center py-12 text-muted-foreground">
      <p class="mb-4">Be the first to comment!</p>
    </div>
  </div>
</template>
