export const APP_ROUTES = {
  home: {
    path: '/',
    name: "Home"
  },
  topic: {
    path: (slug: string) => '/topics/' + slug,
    name: 'topics-slug'
  },
  post: {
    path: (slug: string) => '/posts/' + slug,
    name: 'posts-slug'
  },
  search: {
    path: (q: string) => '/search?q=' + q,
    name: 'search'
  },
  tags:{
    path: (slug: string) => '/tags/' + slug,
    name: 'tags-slug'
  },
  contact: {
    path: '/contact',
    name: 'contact'
  },
  about: {
    path: '/about',
    name: 'about'
  },
  privacy: {
    path: '/privacy',
    name: 'privacy'
  },
  login: {
    path: '/login',
    name: 'Login'
  },
  register: {
    path: '/register',
    name: 'Register'
  },
  forgotPassword: {
    path: '/forgot-password',
    name: 'Forgot Password'
  },
  collection: {
    path: (slug: string) => `/collections/${slug}`,
    name: 'collection'
  }
}