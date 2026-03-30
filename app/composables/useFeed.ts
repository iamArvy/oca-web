// import { ref, unref, watch } from "vue";
// import type { ApiListResponse, Posts } from "~/interfaces";

// export function useFeed(route: string, query?: MaybeRef<Record<string, any>>) {
//   const currentPage = ref(1);
//   const loading = ref(false);
//   const hasNextPage = ref(false);
//   const posts = ref<Posts>([]);
//   const count = ref(0);

//   const fetch = async (page = currentPage.value, reset = false) => {
//     if (loading.value) return;
//     loading.value = true;

//     try {
//       const { data } = await useAPI<ApiListResponse<Posts>>(route, {
//         query: {
//           ...unref(query),
//           page,
//         },
//       });

//       if (reset) {
//         posts.value = data.value?.data ?? [];
//       } else {
//         posts.value.push(...(data.value?.data ?? []));
//       }

//       hasNextPage.value = data.value?.meta?.has_next ?? false;
//       count.value = data.value?.meta?.total ?? 0;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const loadMore = async () => {
//     if (!hasNextPage.value) return;
//     currentPage.value++;
//     await fetch(currentPage.value);
//   };

//   // Initial fetch
//   fetch(1, true);

//   // Reactive query watcher
//   watch(
//     () => unref(query),
//     () => {
//       currentPage.value = 1;
//       fetch(1, true);
//     },
//     { deep: true }
//   );

//   return {
//     loading,
//     posts,
//     count,
//     hasNextPage,
//     currentPage,
//     loadMore,
//   };
// }

import type { ApiListResponse, Posts } from "~/interfaces";
import { API_ROUTES } from "~/constants";
export function useFeed(query?: MaybeRef<Record<string, any>>) {
  const { $api } = useNuxtApp();
  const currentPage = ref<number>(1);
  const loading = ref<boolean>(true);
  const hasNextPage = ref<boolean>(false);
  const posts = ref<Posts>([]);
  const count = ref<number>(0);

  const fetch = async () => {
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
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => unref(query),
    () => {
      posts.value = [];
      currentPage.value = 1;
      hasNextPage.value = false;
      fetch();
    },
    { deep: true }
  );

  onMounted(fetch);

  const loadMore = async () => {
    if (!hasNextPage.value || loading.value) return;
    currentPage.value++;
    await fetch();
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