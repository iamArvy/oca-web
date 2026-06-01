import { ref } from "vue";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, Topic } from "~/types";

type TopicMode = "edit" | "create";
type TopicType = "topic" | "subtopic";

export interface TopicActionEmits {
  (
    e: "edit" | "delete" | "create-subtopic" | "toggle-featured",
    item: Topic,
  ): void;
}

export function useTopicActions() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const mode = ref<TopicMode>("create");
  const type = ref<TopicType>("topic");
  const modalOpen = ref(false);
  const selectedItem = ref<Topic | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<Topic | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleCreateSubtopic(topic: Topic) {
    selectedItem.value = topic;
    mode.value = "create";
    type.value = "subtopic";
    modalOpen.value = true;
  }

  function handleEdit(topic: Topic) {
    selectedItem.value = topic;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(topic: Topic) {
    itemToDelete.value = topic;
    deleteDialogOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;

    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.topic(itemToDelete.value.id),
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

  async function toggleFeatured(topic: Topic) {
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.toggleTopicFeature(topic.id),
        {
          method: "POST",
        },
      );
      success(res.message);
      await refreshNuxtData();
    } catch (e) {
      error(handleError(e, "Something went wrong"));
    }
  }

  function handleClose() {
    modalOpen.value = false;
  }

  return {
    mode,
    type,
    selectedItem,
    modalOpen,
    itemToDelete,
    deleteDialogOpen,
    handleCreate,
    handleDelete,
    confirmDelete,
    handleEdit,
    handleCreateSubtopic,
    handleClose,
    toggleFeatured,
  };
}
