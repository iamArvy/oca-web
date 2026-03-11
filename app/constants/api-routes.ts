export const API_ROUTES = {
  topic: {
    path: (slug: string) => '/topics/' + slug,
    name: 'Topic'
  },
  posts: {
    path: '/public/posts',
    name: "Posts"
  },
  post: {
    path: (slug: string) => '/public/posts/' + slug,
    name: 'Post'
  }
}