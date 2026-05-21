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