<script setup lang="ts">
import { RefreshCcw } from "lucide-vue-next";
import { API_ROUTES } from "~/constants";
import type { ApiListResponse, ContactMessage } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: ['admin'],
});

const {
  deleteDialogOpen,
  itemToDelete,
  handleDelete,
  confirmDelete,
} = useContactMessageActions();

const route = useRoute();
const router = useRouter();

const header = {
  title: "Contact Messages",
  subtitle: "Manage contact messages from users.",
};
const page = computed(() => Number(route.query.page) || 1);

const { data: pages, refresh } = useAPI<ApiListResponse<ContactMessage>>(
  API_ROUTES.admin.contactMessages,
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
  title: "No Contact Messages Found",
  description:
    "You haven't received any contact messages yet.",
};
</script>
<template>
  <div class="space-y-6">
    <AdminPageHeader v-bind="header">
      <AdminContactFilter />
    </AdminPageHeader>
    <template v-if="pages && pages.data && pages.data.length > 0">
      <AdminContactList v-if="pages?.data" :messages="pages?.data" @delete="handleDelete" />
      <AdminPagination v-if="pages.meta.total_pages && pages.meta.total_pages > 1" :meta="pages.meta"
        @change="handlePageChange" />
    </template>
    <AdminEmptyList v-else v-bind="emptyProps" />

    <AdminDeleteDialog v-if="itemToDelete" v-model="deleteDialogOpen" label="Contact Message"
      :value="itemToDelete.name ?? ''" @confirm="confirmDelete" />
  </div>
</template>
