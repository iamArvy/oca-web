import { API_ROUTES } from "~/constants";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import type { ApiResponse, CommentWebsiteData } from "~/types";

export function useCommentForm(postId: MaybeRef<string>) {
    const { success, error } = useToast();
    const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
      z.object({
        postId: z.string(),
        content: z.string().max(300, "Comments must be less than 300 characters")
      }),
    );
    const { handleSubmit, isSubmitting, values, handleReset } = useForm({ validationSchema: formSchema, initialValues: {
      postId: unref(postId),
      content: ''
    } });
    const submit = handleSubmit(async (values) => {
      try {
        const { message } = await $api<ApiResponse<CommentWebsiteData>>(API_ROUTES.admin.comments, {
          method: "POST",
          body: values,
        });
        handleReset()
        await refreshNuxtData();
        success(message || 'Comment Successful');
      } catch (err: any) {
        console.log(err);
        error(err?.statusMessage || 'Something went wrong');
      }
    });


  return { 
    submit,
    isSubmitting,
    values,
  };
}