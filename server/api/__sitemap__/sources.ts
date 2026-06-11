import { ApiListResponse, SitemapData } from '~/types'
import { API_ROUTES } from '~/constants'
import { createApi } from '~~/server/utils/api'

export default defineSitemapEventHandler(async (event) => {
  const api = createApi(event)

  const sources = await api<ApiListResponse<SitemapData>>(API_ROUTES.sitemap.sources)

  return sources.data.map((source) => ({
    loc: `/topics/${source.slug}`,
    lastmod: source.updatedAt,
  }))
})