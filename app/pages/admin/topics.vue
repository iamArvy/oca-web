<script setup lang="ts">
import { FolderOpen } from "lucide-vue-next";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, Topic } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: ['admin'],
});

const {
  mode,
  type,
  deleteDialogOpen,
  itemToDelete,
  modalOpen,
  selectedItem,
  handleCreate,
  handleEdit,
  handleDelete,
  confirmDelete,
  handleCreateSubtopic,
  handleClose,
  toggleFeatured,
} = useTopicActions();

const header = {
  title: "Topics",
  subtitle: "Manage your content topics.",
  action: {
    label: "Create Topic",
    value: handleCreate,
  },
};

const route = useRoute();
// const router = useRouter();

const page = computed(() => Number(route.query.page) || 1);
const { data: topics, refresh } = useAPI<ApiListResponse<Topic>>(
  API_ROUTES.admin.topicsTree, //TODO: switch to tree make the topic and object so it's easier to access
  {
    query: {
      ...route.query,
      page,
    },
  },
);

watch(
  () => route.query.page,
  () => {
    refresh();
  },
);

// function handlePageChange(newPage: number) {
//   router.push({ query: { ...route.query, page: newPage } });
// }

const emptyProps = {
  icon: FolderOpen,
  title: "No Topics Found",
  description:
    "You haven't created any topics yet. Get started by creating your first topic.",
  button: {
    label: "Create Topic",
    action: handleCreate,
  },
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminTopicFilter />
    </AdminPageHeader>
    <template v-if="topics && topics.data && topics.data.length > 0">
      <AdminTopicList v-if="topics?.data" :topics="topics?.data" @create-subtopic="handleCreateSubtopic"
        @edit="handleEdit" @delete="handleDelete" @toggle-featured="toggleFeatured" />
      <!--
        <AppPagination
        v-if="topics.meta.total_pages && topics.meta.total_pages > 1"
        :meta="topics.meta"
        @change="handlePageChange"
      />
      -->
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create'
      ? 'Create New Topic'
      : mode === 'edit'
        ? 'Edit Topic'
        : 'Create Subtopic'
      ">
      <AdminTopicForm :topic="selectedItem" :mode="mode" :type="type" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen"
      :label="itemToDelete.parent ? 'Subtopic' : 'Topic'" :value="itemToDelete.name ?? ''" @confirm="confirmDelete" />
  </div>
</template>
