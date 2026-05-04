<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
import { APP_ROUTES } from "~/constants";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const { comments, count, submit, isSubmitting, getComments, values, hasNextPage, loading, loadMore } = usePostComments(props.postId)
const { user } = useAuth()

onMounted(getComments)

const loadTrigger = ref<HTMLElement | null>(null);
useIntersectionObserver(loadTrigger, (entries) => {
  const entry = entries[0];
  if (entry && entry.isIntersecting) {
    loadMore()
  }
});
</script>

<template>
  <div class="bg-card rounded-2xl p-6 md:p-10 mt-8 shadow-medium">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-display text-2xl font-bold">
        Comments ({{ count }})
      </h3>
    </div>

    <form @submit.prevent="submit" v-if="user" class="flex gap-3 mb-8 pb-8 border-b border-border">
      <Avatar class="w-10 h-10 shrink-0">
        <AvatarImage :src="user.avatar ?? ''" :alt="user.name" />
        <AvatarFallback class="bg-primary/20 text-primary">{{ getInitials(user.name) }}</AvatarFallback>
      </Avatar>
      <div class="flex-1 space-y-3">
        <FormField v-slot="{ componentField }" name="content">
          <FormItem>
            <FormControl>
              <Textarea placeholder="Join the conversation..." v-bind="componentField"
                class="min-h-25 resize-none bg-muted/30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end">
          <Button :disabled="isSubmitting || !values.content || values.content.length < 1"
            class="bg-primary hover:opacity-90">
            Post Comment
          </Button>
        </div>
      </div>
    </form>
    <div v-else class="mb-8 pb-8 border-b border-border">
      <div class="text-center p-6 rounded-lg bg-muted/30">
        <h3 class="text-lg font-semibold mb-2">
          Want to join the discussion?
        </h3>
        <p class="text-sm text-muted-foreground mb-4">
          Sign in to post comments and engage with the community.
        </p>

        <Button @click="$router.push(APP_ROUTES.login.path + `?redirect=${$route.path}`)"
          class="bg-primary hover:opacity-90">
          Login to Comment
        </Button>
      </div>
    </div>

    <div>
      <div v-if="loading" class="text-center flex items-center justify-center py-6 text-muted-foreground">
        <Spinner />
      </div>
      <template v-else>
        <div v-if="comments.length > 0" class="space-y-6">
          <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
          <p v-if="!hasNextPage" class="text-center py-12 text-muted-foreground">
            End of comment section
          </p>
        </div>
        <div v-else class="text-center py-12 text-muted-foreground">
          <p class="mb-4">Be the first to comment!</p>
        </div>
        <div v-if="hasNextPage" class="flex items-center justify-center mt-4">
          <Button variant="outline" @click="loadMore">
            <Plus />
            Load More
          </Button>
        </div>
      </template>
    </div>
    <!-- <div v-if="comments.length > 0" class="space-y-6">
      <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
      <p v-if="!hasNextPage" class="text-center py-12 text-muted-foreground">
        End of comment section
      </p>
    </div> -->

  </div>
</template>
