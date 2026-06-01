import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, Collection } from "~/types";

type CollectionMode = "edit" | "create" | "manage-posts";

export function useCollectionActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const mode = ref<CollectionMode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<Collection | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<Collection | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(collection: Collection) {
    selectedItem.value = collection;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(collection: Collection) {
    itemToDelete.value = collection;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.collection(itemToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(res.message);
      deleteDialogOpen.value = false;
      itemToDelete.value = null;
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Error deleting topic"));
    }
  }

  function handleManagePosts(collection: Collection) {
    selectedItem.value = collection;
    mode.value = "manage-posts";
    modalOpen.value = true;
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
    handleManagePosts,
    handleClose,
  };
}
