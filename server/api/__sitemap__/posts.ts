import { ApiListResponse, Post } from '~/interfaces'
import { API_ROUTES } from '~/constants'

export default defineSitemapEventHandler(async (event) => {
  try {
    const api = createApi(event)

    const { data:posts } = await api<ApiListResponse<Post>>(API_ROUTES.posts.path, {
    query: {
      limit: 1000,
      days: 7,
    },
  })

    return posts.map((post) => ({
      loc: `/posts/${post.slug}`,
      lastmod: post.updatedAt,
    }))
  } catch (err) {
    console.error('Sitemap posts error:', err)
    return []
  }
})