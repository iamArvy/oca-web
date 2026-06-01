import type { ApiResponse, LiveSourceAdminData } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { API_ROUTES } from "~/constants";

type Mode = "edit" | "create";

export function useLiveEditor(item: LiveSourceAdminData | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(2, "Title must be at least 2 characters").max(300),
      source: z.string().url(),
    }),
  );

  const { handleSubmit, setValues, values, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues:
      mode === "edit" && item
        ? {
            name: item.name || "",
            source: item.source || "",
          }
        : undefined,
  });

  function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.liveSources, {
      method: "POST",
      body,
    });
  }

  function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.liveSource(id), {
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
    isSubmitting,
  };
}
