import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { API_ROUTES } from "~/constants";
import type { ApiResponse, Collection } from "~/types";

type Mode = "edit" | "create" | "manage-posts";
// type Type = "topic" | "subtopic";

export function useCollectionEditor(
  item?: Collection | null,
  mode: Mode = "create",
) {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters").max(20),
      description: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50)
        .optional(),
    }),
  );

  const initialValues = (() => {
    if (mode === "edit" && item) {
      return {
        name: item.name || "",
        description: item.description ?? undefined,
      };
    }

    return undefined;
  })();

  const { handleSubmit, setValues, values } = useForm({
    validationSchema: formSchema,
    initialValues,
  });

  function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.collections, {
      method: "POST",
      body,
    });
  }

  function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.collection(id), {
      method: "PATCH",
      body: patchFilter(body),
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
