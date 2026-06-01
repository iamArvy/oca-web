import { API_ROUTES } from "~/constants";
import type {
  ApiListResponse,
  ApiResponse,
  Collection,
  PostAdminData,
  PostCollection,
} from "~/types";

export function useManagePostCollections() {
  const { $api } = useNuxtApp();

  const collections = ref<Collection[]>([]);
  const postCollections = ref<Collection[]>([]);
  const postCollectionIds = computed(
    () => new Set(postCollections.value.map((c) => c.id)),
  );
  const loading = ref(true);

  async function fetchCollections() {
    const res = await $api<ApiListResponse<Collection>>(
      API_ROUTES.admin.collections,
      {
        query: {
          limit: 1000,
        },
      },
    );

    collections.value = res.data ?? [];
  }

  function checkIfCollectionInPost(
    postCollections: PostCollection[],
    collectionId: string,
  ) {
    return postCollections.some((c) => c.collection.id === collectionId);
  }

  async function toggleCollection(post: PostAdminData, collectionId: string) {
    const index = post.collections.findIndex(
      (c) => c.collection.id === collectionId,
    );

    if (index !== -1) {
      await $api<ApiResponse>(
        API_ROUTES.admin.manageCollectionPosts(collectionId),
        {
          method: "POST",
          body: {
            remove: [post.id],
          },
        },
      );
      return post.collections.filter((c) => c.collection.id !== collectionId);
    }

    const collection = collections.value.find((c) => c.id === collectionId);
    if (!collection) return post.collections;

    await $api<ApiResponse>(
      API_ROUTES.admin.manageCollectionPosts(collectionId),
      {
        method: "POST",
        body: {
          add: [post.id],
        },
      },
    );
    await refreshNuxtData();
  }

  onMounted(async () => {
    loading.value = true;
    await fetchCollections();
    loading.value = false;
  });

  return {
    collections,
    postCollections,
    loading,
    postCollectionIds,
    toggleCollection,
    checkIfCollectionInPost,
  };
}
