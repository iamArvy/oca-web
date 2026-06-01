import { ApiListResponse, SitemapData } from '~/types'
import { API_ROUTES } from '~/constants'
import { createApi } from '~~/server/utils/api'

export default defineSitemapEventHandler(async (event) => {
  const api = createApi(event)

  const topics = await api<ApiListResponse<SitemapData>>(API_ROUTES.sitemap.topics, {
    query: {
      limit: 1000,
    },
  })

  return topics.data.map((topic) => ({
    loc: `/topics/${topic.slug}`,
    lastmod: topic.updatedAt,
  }))
})