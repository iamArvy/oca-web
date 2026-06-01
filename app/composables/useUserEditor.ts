import type { ApiResponse, UserAdminData } from "~/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { UserRole } from "~/enums/roles.enum";
import { API_ROUTES } from "~/constants";

type Mode = "edit" | "create";

export function useUserEditor(item: UserAdminData | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { $api } = useNuxtApp();

  const createSchema = z
    .object({
      name: z.string().min(2, "Name must be at least 3 characters").max(50),
      email: z.string().email(),
      role: z.string(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .transform(({ confirmPassword, ...data }) => data);

  const updateSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 3 characters")
      .max(50)
      .optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(UserRole).optional(),
  });

  const formSchema = toTypedSchema(
    mode === "create" ? createSchema : updateSchema,
  );

  const initialValues = (() => {
    if (mode === "edit" && item) {
      return {
        name: item.name || "",
        email: item.email || "",
        role: item.role || "",
      };
    }

    return undefined;
  })();

  const { handleSubmit, setValues, values } = useForm({
    validationSchema: formSchema,
    initialValues,
  });

  function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.users, {
      method: "POST",
      body,
    });
  }

  function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.user(id), {
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

  const userRoleOptions = Object.values(UserRole);

  return {
    mode,
    onSubmit,
    values,
    setValues,
    userRoleOptions,
  };
}
