import { API_ROUTES } from "~/constants";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import type { ApiListResponse, ApiResponse, Comment, Comments } from "~/interfaces";

export function usePostComments(postId: string) {
    const { success, error } = useToast();

  const query = {
    post: postId
  }

  const currentPage = ref(1);
  const loading = ref(false);
  const hasNextPage = ref(false);
  const comments = ref<Comments>([]);
  const count = ref(0)

  const getComments = async () => {
    loading.value = true;
    try {
      const { data, meta } = await useNuxtApp().$api<ApiListResponse<Comments>>(
        API_ROUTES.comments.path,
        {
          query
        }
      );

      if(data) {
        comments.value = data
        count.value = meta.total
        hasNextPage.value = meta.has_next ?? false
      }
    } finally {
      loading.value = false
    }
  }
  
  const loadMore = async () => {
    if (loading.value || !hasNextPage.value) return;
    loading.value = true;
    currentPage.value++;

    try {
      const { data, meta } = await useNuxtApp().$api<ApiListResponse<Comments>>(API_ROUTES.comments.path, {
        query: { ...query, page: currentPage.value },
      });

      if (data?.length) comments.value.push(...data);
      hasNextPage.value = meta?.has_next ?? false;
    } finally {
      loading.value = false;
    }
  };

  const formSchema = toTypedSchema(
      z.object({
        postId: z.string(),
        content: z.string().max(300, "Comments must be less than 300 characters")
      }),
    );
    const { handleSubmit, isSubmitting, values, handleReset } = useForm({ validationSchema: formSchema, initialValues: {
      postId
    } });
    const submit = handleSubmit(async (values) => {
      try {
        const { data, message } = await useNuxtApp().$api<ApiResponse<Comment>>(API_ROUTES.comments.path, {
          method: "POST",
          body: values,
        });
        handleReset()
        getComments()
        success(message || 'Comment Successful');
      } catch (err: any) {
        console.log(err);
        error(err?.statusMessage || 'Something went wrong');
      }
    });


  return {
    loading,
    comments,
    count,
    hasNextPage,
    currentPage,
    loadMore,
    submit,
    isSubmitting,
    getComments,
    values,
  };
}