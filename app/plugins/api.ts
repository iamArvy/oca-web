import { APP_ROUTES } from "~/constants";

export default defineNuxtPlugin((nuxtApp) => {
  const { session, clear } = useUserSession();
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options, error }) {
      if (session.value?.token) {
        options.headers.set("Authorization", `Bearer ${session.value?.token}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        clear()
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
