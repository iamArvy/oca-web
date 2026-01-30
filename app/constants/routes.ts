export const APP_ROUTES = {
  home: {
    path: '/',
    name: "Home"
  },
  category: {
    path: (slug: string) => '/categories/' + slug,
    name: 'categories-slug'
  },
  post: {
    path: (slug: string) => '/posts/' + slug,
    name: 'posts-slug'
  },
  search: {
    path: (q: string) => '/search?q=' + q,
    name: 'search'
  }
}