<script setup lang="ts">
import { RefreshCcw } from "lucide-vue-next";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, LiveSourceAdminData } from "~/types";

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
} = useLiveActions();

const route = useRoute();
const router = useRouter();

const header = {
  title: "Live Sources",
  subtitle: "Manage website's Live news.",
  action: {
    label: "Create Source",
    value: handleCreate,
  },
};
const page = computed(() => Number(route.query.page) || 1);

const { data: sources, refresh } = useAPI<ApiListResponse<LiveSourceAdminData>>(
  API_ROUTES.admin.liveSources,
  {
    query: {
      ...route.query,
      page,
      limit: 20,
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
  title: "No Feeds Found",
  description:
    "You haven't created any live sources yet. Get started by creating your first source.",
  button: {
    label: "Create Sources",
    action: handleCreate,
  },
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminSourceFilter />
    </AdminPageHeader>
    <template v-if="sources && sources.data && sources.data.length > 0">
      <AdminSourceList v-if="sources?.data" :sources="sources?.data" @edit="handleEdit" @delete="handleDelete" />
      <AppPagination v-if="sources.meta.total_pages && sources.meta.total_pages > 1" :meta="sources.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create' ? 'Create New Feed' : 'Edit Feed'">
      <AdminSourceForm :source="selectedItem" :mode="mode" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen" label="Source" :value="itemToDelete.name ?? ''"
      @confirm="confirmDelete" />
  </div>
</template>
