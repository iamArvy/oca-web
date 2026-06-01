import { API_ROUTES, APP_ROUTES } from "~/constants";
import type { ApiResponse, UserAdminData } from "~/types";

export const useAuth = () => {
  const { success, error } = useToast();
  const user = useState<UserAdminData | null>('auth_user', () => null);
  const loading = useState('auth_loading', () => false);
  const { $api } = useNuxtApp();

  const fetchUser = async () => {
    try {
      loading.value = true;

      const { data } = await $api<ApiResponse<UserAdminData>>(API_ROUTES.me.base);

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
      await $api(API_ROUTES.auth.logout, {
        method: 'POST',
      });
      success('Logout Successful');
      await refreshNuxtData();
      navigateTo(APP_ROUTES.home);
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