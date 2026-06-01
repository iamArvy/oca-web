import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, LiveSourceAdminData } from "~/types";

type Mode = "edit" | "create";

export function useLiveActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const mode = ref<Mode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<LiveSourceAdminData | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<LiveSourceAdminData | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(item: LiveSourceAdminData) {
    selectedItem.value = item;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(item: LiveSourceAdminData) {
    itemToDelete.value = item;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.liveSource(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(res.message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting post"));
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
