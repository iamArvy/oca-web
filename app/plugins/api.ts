import { APP_ROUTES } from "~/constants";

export default defineNuxtPlugin((nuxtApp) => {
  const { user } = useAuth();
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
      const data = response._data;
      if (response.status === 401) {
        user.value = null
      }
      throw {
        statusCode: data.statusCode ?? response.status,
        message: data.message
          ? Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message
          : response.statusText,
        errors: data?.errors || null,
      };
    },
  });

  return {
    provide: {
      api,
    },
  };
});
