export const API_ROUTES = {
  public: {
    contact: '/contact',
    topic: (slug: string) => '/topics/' + slug,
    topics: '/topics/',
    posts: '/posts',
    post: (slug: string) => '/posts/' + slug,
    comments: '/comments',
    ads: '/ads',
    adClick: (id: string) => `/ads/${id}/click`,
    source: (slug: string) => '/sources/' + slug,
    page: {
      visit: '/pages/visit',
      seo: (slug: string)=> `/pages/${slug}/seo`,
    },
    navigation: {
      top: '/navigation/top',
      main: '/navigation/main',
    },
    liveSources: "/live-sources",
    subscribe: "/newsletter/subscribe",
    widgets: {
      ticker: '/widgets/ticker',
      hotClicks: '/widgets/hot-clicks',
      editorPicks: '/widgets/editor-picks'
    }
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
  },
  sitemap: {
    topics: '/sitemap/topics/',
    posts: '/sitemap/posts',
    sources: '/sitemap/sources',
  },
  admin: {
    ads: "/admin/ads",
    ad: (id: string) => `/admin/ads/${id}`,
    analytics: {
      visit: '/admin/analytics/visit',
      overview: '/admin/analytics/overview',
      visitorsChart: '/admin/analytics/visitors-chart',
      adsChart: '/admin/analytics/ads-chart',
    },
    comments: "/admin/comments",
    comment: (id: string) => `/admin/comments/${id}`,
    contactMessages: "/admin/contact-messages",
    contactMessage: (id: string) => `/admin/contact-messages/${id}`,
    feeds: "/admin/feeds",
    feed: (id: string) => `/admin/feeds/${id}`,
    liveSources: "/admin/live-sources",
    liveSource: (id: string) => `/admin/live-sources/${id}`,
    posts: "/admin/posts",
    post: (id: string) => "/admin/posts/" + id,
    topics: "/admin/topics",
    topic: (id: string) => `/admin/topics/${id}`,
    toggleTopicFeature: (id: string) => `/admin/topics/${id}/toggle-featured`,
    users: "/admin/users",
    user: (id: string) => `/admin/users/${id}`,
    seos: "/admin/seo",
    seo: (id: string) => `/admin/seo/${id}`,
  },
  media:{
    upload: (context: string) => `/media/upload?type=${context}`
  },
  me: {
    base: '/me', 
    changePassword: "/me/change-password",
    updateProfile: "/me/update",
  },
}