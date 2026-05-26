import { API_ROUTES } from "~/constants"
import { ApiListResponse, Post } from "~/interfaces"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
    const api = createApi(event)

  const posts = await api<ApiListResponse<Post>>(API_ROUTES.posts.path, {
    query: {
      limit: 500,
      days: 7,
    },
  })

  return posts.data
})
