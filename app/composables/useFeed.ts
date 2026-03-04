import type { ApiListResponse, Posts } from "~/interfaces";

export async function useFeed(route: string, query?: Record<string, any>) {
  const { data: initial } = await useAPI<ApiListResponse<Posts>>(route, { query });

  const currentPage = ref(1);
  const loading = ref(false);
  const hasNextPage = ref(initial.value?.meta?.has_next ?? false);
  const posts = ref(initial.value?.data ?? []);

  const loadMore = async () => {
    if (loading.value || !hasNextPage.value) return;
    loading.value = true;
    currentPage.value++;

    try {
      const { data: res } = await useAPI<ApiListResponse<Posts>>(route, {
        query: { ...query, page: currentPage.value },
      });

      if (res.value?.data?.length) posts.value.push(...res.value.data);
      hasNextPage.value = res.value?.meta?.has_next ?? false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    posts,
    hasNextPage,
    currentPage,
    loadMore,
  };
}