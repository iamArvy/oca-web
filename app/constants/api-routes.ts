export const API_ROUTES = {
  topic: {
    path: (slug: string) => '/public/topics/' + slug,
    name: 'Topic'
  },
  topics: {
    path: '/public/topics/',
    name: 'Topics'
  },
  posts: {
    path: '/public/posts',
    name: "Posts"
  },
  post: {
    path: (slug: string) => '/public/posts/' + slug,
    name: 'Post'
  },
  comments: {
    path: '/comments',
    name: 'Comment'
  },
  ads: {
    path: '/public/ads',
    name: 'Ads'
  },
  collection: {
    path: (slug: string) => '/public/collections/' + slug,
    name: 'Collection'
  },
}