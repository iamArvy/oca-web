export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const posts = await $fetch(`${config.public.apiBase}public/posts`, {
    query: {
      limit: 500,
      days: 7,
    },
  })

  return posts
})
