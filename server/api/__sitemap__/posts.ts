import { ApiListResponse, SitemapData } from '~/types'
import { API_ROUTES } from '~/constants'

export default defineSitemapEventHandler(async (event) => {
  try {
    const api = createApi(event)

    const { data:posts } = await api<ApiListResponse<SitemapData>>(API_ROUTES.public.posts, {
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