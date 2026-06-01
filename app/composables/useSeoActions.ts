import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, Seo } from "~/types";

type Mode = "edit" | "create";

export function useSeoActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const mode = ref<Mode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<Seo | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<Seo | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(item: Seo) {
    selectedItem.value = item;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(item: Seo) {
    itemToDelete.value = item;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const { message } = await $api<ApiResponse>(
        API_ROUTES.admin.seo(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting seo"));
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
