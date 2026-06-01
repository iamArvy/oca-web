<script setup lang="ts">
import { Edit, FileText } from "lucide-vue-next";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, PostAdminData } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: ['admin'],
});

const {
  mode,
  deleteDialogOpen,
  postToDelete,
  modalOpen,
  selectedPost,
  handleCreate,
  handleView,
  handleEdit,
  handleDelete,
  confirmDelete,
  handleClose,
} = usePostActions();

const header = {
  title: "Posts",
  subtitle: "Manage all your published and draft posts.",
  action: {
    label: "Create Post",
    value: handleCreate,
  },
};
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page) || 1);

const { data: posts, refresh } = useAPI<ApiListResponse<PostAdminData>>(API_ROUTES.admin.posts, {
  query: {
    ...route.query,
    page,
    limit: 20,
  },
});

watch(
  () => route.query.page,
  () => {
    refresh();
  },
);

function handlePageChange(newPage: number) {
  router.push({ query: { ...route.query, page: newPage, limit: 20 } });
}

const emptyProps = {
  icon: FileText,
  title: "No Posts Found",
  description:
    "You haven't created any posts yet. Get started by creating your first post.",
  button: {
    label: "Create Post",
    action: handleCreate,
  },
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminPostFilter />
    </AdminPageHeader>
    <template v-if="posts && posts.data && posts.data.length > 0">
      <AdminPostList v-if="posts?.data" :posts="posts?.data" @view="handleView" @edit="handleEdit"
        @delete="handleDelete" />
      <AdminPagination v-if="posts.meta.total_pages && posts.meta.total_pages > 1" :meta="posts.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create'
      ? 'Create New Post'
      : mode === 'edit'
        ? 'Edit Post'
        : 'View Post'
      ">
      <template #button>
        <Button v-if="mode === 'view' && selectedPost" variant="outline" size="sm" class="gap-2" @click="mode = 'edit'">
          <Edit class="w-4 h-4" /> Edit
        </Button>
      </template>
      <AdminPostView v-if="mode === 'view' && selectedPost" v-bind="selectedPost" />
      <AdminPostForm v-else :post="selectedPost" :mode="mode" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="postToDelete" v-model="deleteDialogOpen" label="Post" :value="postToDelete.title ?? ''"
      @confirm="confirmDelete" />
  </div>
</template>
