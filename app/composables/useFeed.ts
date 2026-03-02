import type { ApiListResponse, Posts } from "~/interfaces";

export async function useFeed(route: string, query?: object) {
  const { data: initialPosts } =
  await useAPI<ApiListResponse<Posts>>(route);

  const currentPage = ref(1);
  const hasNextPage = ref(initialPosts.value?.meta.has_next ?? false);
  const posts = ref(initialPosts.value?.data || []);
  const loading = ref(false);

  const loadMore = async () => {
    if (loading.value || !hasNextPage.value) return;

    loading.value = true;
    currentPage.value++;

    try {
      const res = await useNuxtApp().$api<ApiListResponse<Posts>>(
        "/latest-posts",
        {
          query: { ...query, page: currentPage.value },
        },
      );

      if (res.data?.length) posts.value.push(...res.data);
      hasNextPage.value = res.meta?.has_next ?? false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    posts,
    loadMore
  }
}
