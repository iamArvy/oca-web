import type { UserAdminData, ApiResponse } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { API_ROUTES } from "~/constants";

export function useProfileInformationForm(user: UserAdminData | null) {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
    z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(300)
        .refine((value) => value.trim().split(/\s+/).length >= 2, {
          message: "Please enter at least first and last name",
        })
        .optional(),
      email: z.string().email("Invalid email address").optional(),
    }),
  );

  const { handleSubmit, setValues, values, meta } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await $api<ApiResponse>(API_ROUTES.me.base, {
        method: "POST",
        body: values,
      });
      success(res.message);
      await refreshNuxtData();
    } catch (e: unknown) {
      console.error(e);
      error(handleError(e, "Something went wrong"));
    }
  });

  return {
    onSubmit,
    values,
    setValues,
    meta,
  };
}
