import type { H3Event } from 'h3'

export const createApi = (event?: H3Event) => {
  const config = useRuntimeConfig()

  let headers: HeadersInit = {}

  if (event) {
    headers = {
      cookie: getRequestHeader(event, 'cookie') || '',
    }
  }

  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
    headers,

    onResponseError({ response }) {
      const data = response._data

      throw {
        statusCode: data.statusCode ?? response.status,
        message: data.message,
        errors: data?.errors || null,
      }
    },
  })
}