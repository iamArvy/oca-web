import type { ApiResponse, Topic } from "~/types";
import { useForm } from "vee-validate";
import { API_ROUTES } from "~/constants";
import { TopicValidationSchema } from "~/schemas";

type Mode = "edit" | "create";

export function useTopicEditor(item: Topic | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const initialValues = (() => {
    if (mode === "edit" && item) {
      return {
        name: item.name || "",
        parentId: item.parent?.id,
        keywords: item.keywords,
      };
    }

    if (mode === "create" && item) {
      return {
        parentId: item.id,
      };
    }

    return undefined;
  })();

  const { handleSubmit, setValues, values } = useForm({
    validationSchema: TopicValidationSchema,
    initialValues,
  });

  function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.topics, {
      method: "POST",
      body,
    });
  }

  function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.topic(id), {
      method: "PATCH",
      body,
    });
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      let res: ApiResponse | null = null;
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

  return {
    mode,
    onSubmit,
    values,
    setValues,
  };
}
