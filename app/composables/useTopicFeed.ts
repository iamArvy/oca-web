import type { ApiListResponse, Posts, TopicPostsArray } from "~/interfaces";
export function useTopicFeed(route: string, query?: MaybeRef<Record<string, any>>) {
  const { $api } = useNuxtApp();
  const currentPage = ref<number>(1);
  const loading = ref(false);
  const hasNextPage = ref<boolean>(false);
  const topics = ref<TopicPostsArray>([]);
  const count = ref<number>(0);

  const fetch = async () => {
    if (loading.value) return;
    loading.value = true;

    try {
      const { data, meta } = await $api<ApiListResponse<TopicPostsArray>>(
        route,
        {
          query: {
            ...unref(query),
            limit: 3,
            postLimit: 4,
            page: currentPage.value,
          }
        }
      );

      if (!data) return;

      hasNextPage.value = meta.has_next ?? false;
      if (data.length > 0) topics.value.push(...data);
      count.value = meta.total;
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => JSON.stringify(unref(query)),
    () => {
      topics.value = [];
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
    topics,
    count,
    hasNextPage,
    currentPage,
    loadMore,
  };
}