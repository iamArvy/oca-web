// import { ApiListResponse, Post } from '~/interfaces'
// import { API_ROUTES } from '~/constants'

export default defineSitemapEventHandler(async (event) => {
  // const api = createApi(event)

  // const posts = await api<ApiListResponse<Post>>(API_ROUTES.posts.path, {
  //   query: {
  //     limit: 100,
  //     days: 7,
  //   }
  // })

  const posts = {
  data: [
    { slug: 'test', updatedAt: new Date() }
  ]
}

  return posts.data.map((post) => ({
    loc: `/posts/${post.slug}`,
    lastmod: post.updatedAt,
  }))
})