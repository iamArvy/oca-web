<script setup lang="ts">
import { RefreshCcw } from "@lucide/vue";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, FeedAdminData } from "~/types";

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
} = useFeedActions();

const route = useRoute();
const router = useRouter();

const header = {
  title: "Feeds",
  subtitle: "Manage website's RSS Feeds.",
  action: {
    label: "Create Feed",
    value: handleCreate,
  },
};

const page = computed(() => Number(route.query.page) || 1);

const { data: feeds, refresh } = useAPI<ApiListResponse<FeedAdminData>>(API_ROUTES.admin.feeds, {
  query: {
    ...route.query,
    page,
  },
});
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
    "You haven't created any feeds yet. Get started by creating your first feed.",
  button: {
    label: "Create Feed",
    action: handleCreate,
  },
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminFeedFilter />
    </AdminPageHeader>
    <template v-if="feeds && feeds.data && feeds.data.length > 0">
      <AdminFeedList v-if="feeds?.data" :feeds="feeds?.data" @edit="handleEdit" @delete="handleDelete" />
      <AdminPagination v-if="feeds.meta.total_pages && feeds.meta.total_pages > 1" :meta="feeds.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create' ? 'Create New Feed' : 'Edit Feed'">
      <AdminFeedForm :feed="selectedItem" :mode="mode" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen" label="Feed" :value="itemToDelete.name ?? ''"
      @confirm="confirmDelete" />
  </div>
</template>
