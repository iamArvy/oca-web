import { ApiListResponse, Post } from '~/interfaces'
import { API_ROUTES } from '~/constants'
import { createApi } from '~~/server/utils/api'

export default defineSitemapEventHandler(async (event) => {
  const api = createApi(event)

  const posts = await api<ApiListResponse<Post>>(API_ROUTES.posts.path, {
    query: {
      limit: 5000,
      days: 7,
    }
  })

  return posts.data.map((post) => ({
    loc: `/posts/${post.slug}`,
    lastmod: post.updatedAt,
  }))
})