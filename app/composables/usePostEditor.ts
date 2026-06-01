import { PostType, type ApiResponse, type PostAdminData } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { UploadType } from "~/enums";
import { API_ROUTES } from "~/constants";

type Mode = "edit" | "create" | "view";

export function usePostEditor(post: PostAdminData | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { fileRef, upload } = useFileUpload();
  const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
    z.object({
      title: z.string().min(2, "Title must be at least 2 characters").max(300),
      excerpt: z.string().optional(),
      content: z.string().min(2, "Content is required"),
      topicId: z.string().min(2, "Topic is required"),
      type: z.nativeEnum(PostType),
      image: z.string().optional(),
      tags: z.array(z.string().min(2)).optional().default([]),
    }),
  );

  const { handleSubmit, setValues, values } = useForm({
    validationSchema: formSchema,
    initialValues:
      mode === "edit" && post
        ? {
            title: post.title || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            topicId: post.topic.id || "",
            image: post.image || "",
            tags: post.tags || [],
            type: post.type,
          }
        : undefined,
  });

  function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.posts, {
      method: "POST",
      body,
    });
  }

  function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.post(id), {
      method: "PATCH",
      body: patchFilter(body),
    });
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      let res: ApiResponse | null = null;
      if (fileRef.value) {
        const file = await upload(UploadType.POST);
        values.image = file?.url;
      }
      switch (mode) {
        case "edit":
          if (post) res = await update(post.id, values);
          break;

        case "create":
          res = await create(values);
          break;
      }
      if (res) success(res.message);
      await refreshNuxtData();
    } catch (e: unknown) {
      console.error(e);
      error(handleError(e, "Something went wrong"));
    }
  });

  return {
    mode,
    onSubmit,
    values,
    setValues,
    fileRef,
  };
}
