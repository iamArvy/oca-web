import type { ApiListResponse, Posts } from "~/interfaces";
import { API_ROUTES } from "~/constants";
import { useIntersectionObserver } from "@vueuse/core";

interface UsePaginationOptions<I> {
  route: string;
  initialItems?: Ref<ApiListResponse<I> | undefined>;
  query?: MaybeRef<Record<string, any>>;
}

export function usePagination<I>(options: UsePaginationOptions<I>) {
  const { $api } = useNuxtApp();

  const currentPage = ref(1);
  const loading = ref(false);

  const items = shallowRef<I[]>([]);
  const hasNextPage = ref(false);
  const count = ref(0);

  // 👇 IMPORTANT: hydrate from SSR when available
  watch(
    () => options.initialItems?.value,
    (val) => {
      if (!val) return;

      items.value = val.data ?? [];
      hasNextPage.value = val.meta.has_next ?? false;
      count.value = val.meta.total ?? 0;
      currentPage.value = 1;
    },
    { immediate: true }
  );

  const loadMore = async () => {
    if (loading.value || !hasNextPage.value) return;

    loading.value = true;

    try {
      const { data, meta } = await $api<ApiListResponse<I>>(
        options.route,
        {
          query: {
            ...unref(options.query),
            page: currentPage.value + 1,
          },
        }
      );

      currentPage.value++;

      if (!data) return;
      items.value = [...items.value, ...data];

      hasNextPage.value = meta.has_next ?? false;
      count.value = meta.total ?? 0;
    } finally {
      loading.value = false;
    }
  };

  const loadTrigger = ref<HTMLElement | null>(null);
  useIntersectionObserver(loadTrigger, (entries) => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) {
      loadMore()
    }
  });

  return {
    items,
    count,
    hasNextPage,
    currentPage,
    loading,
    loadMore,
    loadTrigger
  };
}