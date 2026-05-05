import { API_ROUTES } from "~/constants";

import type { ApiListResponse, ApiResponse, Comment, Comments } from "~/interfaces";

export function usePostComments(query?: MaybeRef<Record<string, any>>) {
    const { $api } = useNuxtApp();

  const currentPage = ref(1);
  const loading = ref(false);
  const hasNextPage = ref(false);
  const comments = ref<Comments>([]);
  const count = ref(0)

  const fetch = async () => {
      if (loading.value) return;
      loading.value = true;
  
      try {
        const { data, meta } = await $api<ApiListResponse<Comments>>(
          API_ROUTES.comments.path,
          {
            query: {
              ...unref(query),
              page: currentPage.value,
              limit: 10,
            }
          }
        );
  
        if (!data) return;
  
        hasNextPage.value = meta.has_next ?? false;
        if (data.length > 0) comments.value.push(...data);
        count.value = meta.total;
      } finally {
        loading.value = false;
      }
    };
  
    watch(
      () => JSON.stringify(unref(query)),
      () => {
        comments.value = [];
        currentPage.value = 1;
        hasNextPage.value = false;
        fetch();
      },
      { immediate: false }
    );
    onMounted(fetch);
  
    const loadMore = () => {
      if (!hasNextPage.value || loading.value) return;
      currentPage.value++;
      fetch();
    };

  return {
    loading,
    comments,
    count,
    hasNextPage,
    currentPage,
    loadMore,
  };
}