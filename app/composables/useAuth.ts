import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

export const useLoginForm = () => {
  const { success, error } = useToast();
  const { fetch: refreshSession } = useUserSession();
  const { query } = useRoute();
  const redirectPath = (query.redirect as string) || "/";
  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email('Email must be a valid email'),
      password: z.string().min(8, 'Password must be at least 8 digits long').max(50),
    }),
  );
  const { handleSubmit, isSubmitting } = useForm({ validationSchema: formSchema });
  const submit = handleSubmit(async (values) => {
    try {
      const { data:res, error } = await useFetch<{ message: string }>("/api/login", {
        method: "POST",
        body: values,
      });
      if (error.value) throw error.value;
      success(res.value?.message || 'Login Successful');
      await refreshSession();
      navigateTo(redirectPath);
    } catch (err: any) {
      console.log(err);
      error(err?.message || 'Something went wrong');
    }
  });

  return {
    submit,
    isSubmitting
  };
};

export const useRegisterForm = () => {
  const { success, error } = useToast();
  const { fetch: refreshSession } = useUserSession();
  const { query } = useRoute();
  const redirectPath = (query.redirect as string) || "/";
  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(3, 'Name must be at least 3 characters').max(50),
      email: z.string().email('Email must be a valid email'),
      password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    }),
  );
  const { handleSubmit, isSubmitting } = useForm({ validationSchema: formSchema });
  const submit = handleSubmit(async (values) => {
    try {
      const { data:res, error } = await useFetch<{ message: string }>("/api/register", {
        method: "POST",
        body: values,
      });
      console.log(error.value)
      if (error.value) throw error.value;
      success(res.value?.message || 'Registration Successful');
      await refreshSession();
      navigateTo(redirectPath);
    } catch (err: any) {
      console.log(err);
      error(err?.message || 'Something went wrong');
    }
  });

  return {
    submit,
    isSubmitting
  };
};
