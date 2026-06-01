import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, FeedAdminData } from "~/types";

type FeedMode = "edit" | "create";

export function useFeedActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const mode = ref<FeedMode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<FeedAdminData | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<FeedAdminData | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(item: FeedAdminData) {
    selectedItem.value = item;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(item: FeedAdminData) {
    itemToDelete.value = item;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.feed(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(res.message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting Feed"));
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
