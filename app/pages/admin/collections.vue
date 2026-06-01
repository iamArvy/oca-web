<script setup lang="ts">
import { Layers } from "lucide-vue-next";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, Collection } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: ['admin'],
});

const {
  mode,
  deleteDialogOpen,
  itemToDelete,
  modalOpen,
  selectedItem,
  handleCreate,
  handleEdit,
  handleDelete,
  confirmDelete,
  handleClose,
  handleManagePosts,
} = useCollectionActions();

const header = {
  title: "Collections",
  subtitle: "Manage your collections.",
  action: {
    label: "Create Collection",
    value: handleCreate,
  },
};
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page) || 1);

const { data: collections, refresh } = useAPI<ApiListResponse<Collection>>(
  API_ROUTES.admin.collections,
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

function handlePageChange(newPage: number) {
  router.push({ query: { ...route.query, page: newPage } });
}

const emptyProps = {
  icon: Layers,
  title: "No Collections Found",
  description:
    "You haven't created any collections yet. Get started by creating your first collection.",
  button: {
    label: "Create Collection",
    action: handleCreate,
  },
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminCollectionFilter />
    </AdminPageHeader>
    <template v-if="collections && collections.data && collections.data.length > 0">
      <AdminCollectionList v-if="collections?.data" :collections="collections?.data" @edit="handleEdit"
        @delete="handleDelete" @manage-posts="handleManagePosts" />
      <AdminPagination v-if="collections.meta.total_pages && collections.meta.total_pages > 1" :meta="collections.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create'
      ? 'Create New Collection'
      : mode === 'edit'
        ? 'Edit Collection'
        : 'Manage Collection Posts'
      ">
      <AdminCollectionPosts v-if="mode === 'manage-posts' && selectedItem" :collection="selectedItem" />
      <AdminCollectionForm v-else :collection="selectedItem" :mode="mode" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen" label="Collection"
      :value="itemToDelete.name ?? ''" @confirm="confirmDelete" />
  </div>
</template>
