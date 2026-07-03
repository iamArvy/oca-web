<script setup lang="ts">
import { RefreshCcw } from "@lucide/vue";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, Seo } from "~/types";

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
} = useSeoActions();

const route = useRoute();
const router = useRouter();

const header = {
  title: "Static Pages",
  subtitle: "Manage website's static pages SEO.",
  action: {
    label: "Create Static Page",
    value: handleCreate,
  },
};
const page = computed(() => Number(route.query.page) || 1);

const { data: pages, refresh } = useAPI<ApiListResponse<Seo>>(
  API_ROUTES.admin.seos,
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
  icon: RefreshCcw,
  title: "No Pages Found",
  description:
    "You haven't created any static pages yet. Get started by creating your first page.",
  button: {
    label: "Create Pages",
    action: handleCreate,
  },
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminFeedFilter />
    </AdminPageHeader>
    <template v-if="pages && pages.data && pages.data.length > 0">
      <AdminSeoList v-if="pages?.data" :seos="pages?.data" @edit="handleEdit" @delete="handleDelete" />
      <AdminPagination v-if="pages.meta.total_pages && pages.meta.total_pages > 1" :meta="pages.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create' ? 'Create New Page' : 'Edit Page'">
      <AdminSeoForm :seo="selectedItem" :mode="mode" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen" label="Page" :value="itemToDelete.title ?? ''"
      @confirm="confirmDelete" />
  </div>
</template>
