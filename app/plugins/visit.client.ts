import { API_ROUTES } from "~/constants";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const { $api } = useNuxtApp();

  const track = async (path: string) => {
    try {
      await $api(API_ROUTES.public.page.visit, {
        method: "POST",
        body: {
          path,
        },
      });
    } catch {}
  };

  // First load
  // track(window.location.pathname);

  // Navigation
  router.afterEach((to, from) => {
    track(to.fullPath);
  });
});