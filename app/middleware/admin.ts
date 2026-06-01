import { APP_ROUTES } from "~/constants";

export default defineNuxtRouteMiddleware(async () => {
  const { user, fetchUser } = useAuth();

  if (!user.value) {
    await fetchUser();
  }

  if (!user.value) {
    return navigateTo(APP_ROUTES.admin.login);
  }
});