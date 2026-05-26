import { ApiListResponse, Topic } from '~/interfaces'
import { API_ROUTES } from '~/constants'
import { createApi } from '~~/server/utils/api'

export default defineSitemapEventHandler(async (event) => {
  const api = createApi(event)

  const topics = await api<ApiListResponse<Topic>>(API_ROUTES.topics.path)

  return topics.data.map((topic) => ({
    loc: `/topics/${topic.slug}`,
    lastmod: topic.updatedAt,
  }))
})