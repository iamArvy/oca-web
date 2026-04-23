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
  feed: {
    path: (slug: string) => '/public/feeds/' + slug,
    name: 'Feed'
  },
  topicPosts: {
    path: '/public/topic-posts',
    name: 'Topic Posts'
  },
  topicTree: {
    path: '/public/topics-tree',
    name: 'Topic Tree'
  },
  relatedTopics: {
    path: (slug: string) => `/public/related-topics/${slug}`,
    name: 'Related Topics'
  },
}