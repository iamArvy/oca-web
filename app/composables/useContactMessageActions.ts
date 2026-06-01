import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, ContactMessage, ContactMessageStatus } from "~/types";

export function useContactMessageActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<ContactMessage | null>(null);


  async function handleUpdateStatus(item: ContactMessage, status: ContactMessageStatus) {
    try {
      if (item.status === status) return; // No need to update if the status is the same
      const { message } = await $api<ApiResponse>(
        API_ROUTES.admin.contactMessage(item.id),
        {
          method: "PATCH",
          body: { status },
        },
      );
      success(message);
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error updating contact message status"));
    }
  }

  function handleDelete(item: ContactMessage) {
    itemToDelete.value = item;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const { message } = await $api<ApiResponse>(
        API_ROUTES.admin.contactMessage(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting contact message"));
    }
  }

  return {
    itemToDelete,
    deleteDialogOpen,
    handleDelete,
    confirmDelete,
    handleUpdateStatus,
  };
}
