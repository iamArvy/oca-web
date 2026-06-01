import type { ApiResponse, Seo } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { API_ROUTES } from "~/constants";

type Mode = "edit" | "create";

export function useSeoEditor(item?: Seo | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
    z.object({
      title: z
        .string()
        .min(2, "Title must be at least 2 characters")
        .max(300, "Title must not exceed 300 characters")
        .trim(),

      slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .max(200, "Slug must not exceed 200 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (lowercase, hyphens only)")
        .trim(),

      description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must not exceed 500 characters")
        .trim(),

      keywords: z
        .array(
          z
            .string()
            .min(2, "Keyword too short")
            .max(50, "Keyword too long")
            .trim()
        )
        .min(1, "At least one keyword is required")
        .max(20, "Maximum of 20 keywords allowed"),

      author: z
        .string()
        .min(2, "Author name must be at least 2 characters")
        .max(100, "Author name too long")
        .trim(),

      ogTitle: z
        .string()
        .min(2, "OG title must be at least 2 characters")
        .max(300, "OG title must not exceed 300 characters")
        .trim(),

      ogDescription: z
        .string()
        .min(10, "OG description must be at least 10 characters")
        .max(500, "OG description must not exceed 500 characters")
        .trim(),
    }),
  );

  const { handleSubmit, setValues, values, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues:
      mode === "edit" && item
        ? {
            title: item.title || "",
            slug: item.slug || "",
            description: item.description || "",
            keywords: item.keywords || "",
            author: item.author || "",
            ogTitle: item.ogTitle || "",
            ogDescription: item.ogDescription || "",
          }
        : undefined,
  });

  function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.seos, {
      method: "POST",
      body,
    });
  }

  function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.seo(id), {
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
