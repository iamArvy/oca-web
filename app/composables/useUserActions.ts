import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, UserAdminData } from "~/types";

export type UserMode = "edit" | "create";

export function useUserActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const mode = ref<UserMode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<UserAdminData | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<UserAdminData | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(user: UserAdminData) {
    selectedItem.value = user;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(user: UserAdminData) {
    itemToDelete.value = user;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.user(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(res.message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting user"));
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
