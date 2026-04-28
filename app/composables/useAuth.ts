import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { ApiResponse, User } from "~/interfaces";

export const useAuth = () => {
  const { success, error } = useToast();
  const user = useState<User | null>('auth_user', () => null);
  const loading = useState('auth_loading', () => false);
  const { $api } = useNuxtApp();

  const fetchUser = async () => {
    try {
      loading.value = true;

      const { data } = await $api<ApiResponse<User>>('/me');

      user.value = data ?? null;
    } catch (e) {
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    const { $api } = useNuxtApp();

    
    try {
      await $api('/auth/logout', {
        method: 'POST',
      });
      success('Logout Successful');
      await refreshNuxtData();
    } catch (e: unknown) {
      error(handleError(e, "Something went wrong"));
    }

    user.value = null;
  };

  return {
    user,
    loading,
    fetchUser,
    logout,
  };
};

export const useLoginForm = () => {
  const { success, error } = useToast();
  const { query } = useRoute();
  const { $api } = useNuxtApp();
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
      await $api("/auth/login", {
        method: "POST",
        body: values,
      });
      success('Login Successful');
      navigateTo(redirectPath);
    } catch (e: unknown) {
      error(handleError(e, "Something went wrong"));
    }
  });

  return {
    submit,
    isSubmitting
  };
};

export const useRegisterForm = () => {
  const { success, error } = useToast();
  const { query } = useRoute();
  const { $api } = useNuxtApp();
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
      await $api<{ message: string }>("/auth/register", {
        method: "POST",
        body: values,
      });
      success('Registration Successful');
      navigateTo(redirectPath);
    } catch (e: unknown) {
      error(handleError(e, "Something went wrong"));
    }
  });

  return {
    submit,
    isSubmitting
  };
};
