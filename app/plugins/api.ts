import { APP_ROUTES } from "~/constants";

export default defineNuxtPlugin((nuxtApp) => {
  const { logout } = useAuth();
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
    onRequest({ options }) {
      if (import.meta.server) {
        const { cookie } = useRequestHeaders(['cookie']);

        if (cookie) {
          options.headers = new Headers(options.headers);
          options.headers.set('cookie', cookie);
        }

        console.log(cookie);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        logout()
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
