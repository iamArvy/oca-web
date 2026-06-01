import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { AdAdminData, ApiResponse } from "~/types";

type AdMode = "edit" | "create";

export function useAdActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const mode = ref<AdMode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<AdAdminData | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<AdAdminData | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(ad: AdAdminData) {
    selectedItem.value = ad;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(ad: AdAdminData) {
    itemToDelete.value = ad;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.ad(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(res.message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting ad"));
    }
  }

  function handleClose() {
    modalOpen.value = false;
  }

  return {
    mode,
    selectedItem,
    modalOpen,
    itemToDelete,
    deleteDialogOpen,
    handleCreate,
    handleDelete,
    confirmDelete,
    handleEdit,
    handleClose,
  };
}
