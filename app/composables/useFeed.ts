import type { ApiListResponse, Posts } from "~/interfaces";
import { API_ROUTES } from "~/constants";
export function useFeed(query?: MaybeRef<Record<string, any>>) {
  const { $api } = useNuxtApp();
  const currentPage = ref<number>(1);
  const loading = ref(false);
  const hasNextPage = ref<boolean>(false);
  const posts = ref<Posts>([]);
  const count = ref<number>(0);

  const fetch = async () => {
    if (loading.value) return;
    loading.value = true;

    try {
      const { data, meta } = await $api<ApiListResponse<Posts>>(
        API_ROUTES.posts.path,
        {
          query: {
            ...unref(query),
            page: currentPage.value,
          }
        }
      );

      if (!data) return;

      hasNextPage.value = meta.has_next ?? false;
      if (data.length > 0) posts.value.push(...data);
      count.value = meta.total;

      console.log(currentPage.value);
      console.log(hasNextPage.value);
      console.log(count.value);
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => JSON.stringify(unref(query)),
    () => {
      posts.value = [];
      currentPage.value = 1;
      hasNextPage.value = false;
      fetch();
    },
    { immediate: false }
  );
  onMounted(fetch);

  const loadMore = () => {
    console.log(currentPage.value);
    console.log(hasNextPage.value);
    console.log(count.value);

    if (!hasNextPage.value || loading.value) return;
    currentPage.value++;
    fetch();
  };

  return {
    loading,
    posts,
    count,
    hasNextPage,
    currentPage,
    loadMore,
  };
}