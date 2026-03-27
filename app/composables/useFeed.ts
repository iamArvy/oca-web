import { ref, unref, watch } from "vue";
import type { ApiListResponse, Posts } from "~/interfaces";

export function useFeed(route: string, query?: MaybeRef<Record<string, any>>) {
  const currentPage = ref(1);
  const loading = ref(false);
  const hasNextPage = ref(false);
  const posts = ref<Posts>([]);
  const count = ref(0);

  const fetch = async (page = currentPage.value, reset = false) => {
    if (loading.value) return;
    loading.value = true;

    try {
      const { data } = await useAPI<ApiListResponse<Posts>>(route, {
        query: {
          ...unref(query),
          page,
        },
      });

      if (reset) {
        posts.value = data.value?.data ?? [];
      } else {
        posts.value.push(...(data.value?.data ?? []));
      }

      hasNextPage.value = data.value?.meta?.has_next ?? false;
      count.value = data.value?.meta?.total ?? 0;
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async () => {
    if (!hasNextPage.value) return;
    currentPage.value++;
    await fetch(currentPage.value);
  };

  // Initial fetch
  fetch(1, true);

  // Reactive query watcher
  watch(
    () => unref(query),
    () => {
      currentPage.value = 1;
      fetch(1, true);
    },
    { deep: true }
  );

  return {
    loading,
    posts,
    count,
    hasNextPage,
    currentPage,
    loadMore,
  };
}