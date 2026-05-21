export const API_ROUTES = {
  login: {
    path: '/auth/login'
  },
  register: {
    path: '/auth/register'
  },
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
  ads_click: {
    path: (id: string) => `/public/ads/${id}/clicks`,
    name: 'Ads Click'
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
  liveSources: {
    path: "/live-sources",
    name: "Live Sources",
  },
  subscribe: {
    path: "/public/subscribe",
    name: "Subscribe"
  },
  forgotPassword: {
    path: "/auth/forgot-password",
    name: "Forgot Password"
  },
  resetPassword: {
    path: "/auth/reset-password",
    name: "Reset Password"
  },
  seo: {
    path: (slug: string) => `public/seo/${slug}`,
    name: "Seo",
  },
  contact: {
    path: "/public/contact",
    name: "Contact"
  }
}