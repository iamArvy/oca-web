<script setup lang="ts">
import { Megaphone } from "lucide-vue-next";
import { API_ROUTES } from "~/constants";
import type { AdAdminData, ApiListResponse } from "~/types";
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
} = useAdActions();

const header = {
  title: "Ads",
  subtitle: "Manage all your ads.",
  action: {
    label: "Create Ad",
    value: handleCreate,
  },
};
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page) || 1);

const { data: ads, refresh } = useAPI<ApiListResponse<AdAdminData>>(API_ROUTES.admin.ads, {
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
  icon: Megaphone,
  title: "No Ads Found",
  description:
    "You haven't created any ads yet. Get started by creating your first ad.",
  button: {
    label: "Create Ad",
    action: handleCreate,
  },
};

</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminAdsFilter />
    </AdminPageHeader>
    <template v-if="ads && ads.data && ads.data.length > 0">
      <AdminAdsList v-if="ads?.data" :ads="ads?.data" @edit="handleEdit" @delete="handleDelete" />
      <AdminPagination v-if="ads.meta.total_pages && ads.meta.total_pages > 1" :meta="ads.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />
    <AdminModalComponent v-model:open="modalOpen" :title="mode === 'create' ? 'Create New Ads' : 'Edit Ads'">
      <AdminAdsForm :ad="selectedItem" :mode="mode" @cancel="handleClose" />
    </AdminModalComponent>
    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen" label="Post" :value="itemToDelete.title ?? ''"
      @confirm="confirmDelete" />
  </div>
</template>
