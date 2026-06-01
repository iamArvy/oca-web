import { API_ROUTES } from "~/constants";
import type { PostAdminData, ApiListResponse, ApiResponse } from "~/types";

export function useCollectionPosts(collectionId: string) {
  const posts = ref<PostAdminData[]>([]);
  const loading = ref(true);
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  async function fetchPosts() {
    const { data: res } = await useAPI<ApiListResponse<PostAdminData>>(API_ROUTES.admin.posts, {
      query: {
        collection: collectionId,
      },
    });

    posts.value = res.value?.data ?? [];
  }

  onMounted(async () => {
    loading.value = true;
    await fetchPosts();
    loading.value = false;
  });

  const handleRemovePost = async (id: string) => {
    try {
      const res = await $api<ApiResponse>(
        API_ROUTES.admin.manageCollectionPosts(collectionId),
        {
          method: "POST",
          body: {
            remove: [id],
          },
        },
      );
      success(res.message);
      const index = posts.value.findIndex((p) => p.id === id);
      posts.value.splice(index, 1);
    } catch (e: unknown) {
      error(handleError(e, "Error creating Topic"));
    }
  };

  return {
    loading,
    posts,
    handleRemovePost,
  };
}
