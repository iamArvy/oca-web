import { FeedTransformer, type ApiResponse, type FeedAdminData } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { UploadType } from "~/enums";
import { API_ROUTES } from "~/constants";

type Mode = "edit" | "create";

export function useFeedEditor(item: FeedAdminData | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();
  const { fileRef, upload } = useFileUpload();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters").max(50),
      source: z.string().url(),
      topicId: z.string().min(2),
      transformer: z.nativeEnum(FeedTransformer).optional(),
      image: z.string().optional(),
    }),
  );

  const initialValues = (() => {
    if (mode === "edit" && item) {
      return {
        name: item.name || "",
        source: item.source || "",
        topicId: item.topic.id || "",
        transformer: item.transformer || undefined,
        image: item.image ?? undefined,
      };
    }

    return undefined;
  })();

  const { handleSubmit, setValues, values, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues,
  });

  async function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.feeds, {
      method: "POST",
      body,
    });
  }

  async function update(id: string, body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.feed(id), {
      method: "PATCH",
      body,
    });
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      let res: ApiResponse | null = null;
      if (fileRef.value) {
        const file = await upload(UploadType.FEED);
        values.image = file?.url;
      }
      switch (mode) {
        case "edit":
          if (item) res = await update(item.id, values);
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

  const FeedTransformerOptions = Object.values(FeedTransformer);

  return {
    mode,
    onSubmit,
    values,
    setValues,
    FeedTransformerOptions,
    fileRef,
    isSubmitting,
  };
}
