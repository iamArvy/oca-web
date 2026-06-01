import type { ApiResponse } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { API_ROUTES } from "~/constants";

export function useProfileSecurityForm() {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
    z
      .object({
        currentPassword: z
          .string()
          .min(8, "Current password must be at least 8 characters")
          .max(300),

        newPassword: z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Must contain an uppercase letter")
          .regex(/[a-z]/, "Must contain a lowercase letter")
          .regex(/[0-9]/, "Must contain a number")
          .regex(/[^A-Za-z0-9]/, "Must contain a special character"),

        confirmPassword: z.string(),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
      .transform(({ confirmPassword, ...data }) => data),
  );

  const { handleSubmit, setValues, values, meta } = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await $api<ApiResponse>(API_ROUTES.me.changePassword, {
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
