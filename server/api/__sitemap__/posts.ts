import { ApiListResponse, Post } from '~/interfaces'
// import { API_ROUTES } from '~/constants'

export default defineSitemapEventHandler(async (event) => {
  try {
    // const api = createApi(event)

    const posts = await $fetch<ApiListResponse<Post>>('/api/sitemap/post')

    return posts.data.map((post) => ({
      loc: `/posts/${post.slug}`,
      lastmod: post.updatedAt,
    }))
  } catch (err) {
    console.error('Sitemap posts error:', err)
    return []
  }
})