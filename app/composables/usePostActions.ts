import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, PostAdminData } from "~/types";

type PostMode = "view" | "edit" | "create";

export function usePostActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const mode = ref<PostMode>("create");
  const modalOpen = ref(false);
  const selectedPost = ref<PostAdminData | null>(null);

  const deleteDialogOpen = ref(false);
  const postToDelete = ref<PostAdminData | null>(null);

  function handleCreate() {
    selectedPost.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleView(post: PostAdminData) {
    selectedPost.value = post;
    mode.value = "view";
    modalOpen.value = true;
  }

  function handleEdit(post: PostAdminData) {
    selectedPost.value = post;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(post: PostAdminData) {
    postToDelete.value = post;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!postToDelete.value) return;
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.post(postToDelete.value.id),
        {
          method: "DELETE",
        },
      );
      success(res.message);
      deleteDialogOpen.value = false;
      postToDelete.value = null;
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
    selectedPost,
    modalOpen,
    postToDelete,
    deleteDialogOpen,
    handleCreate,
    handleDelete,
    confirmDelete,
    handleView,
    handleEdit,
    handleClose,
  };
}
