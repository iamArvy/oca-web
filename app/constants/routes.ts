export const APP_ROUTES = {
  home: {
    path: '/',
    name: "Home"
  },
  category: {
    path: (slug: string) => '/categories/' + slug,
    name: 'categories-slug'
  },
  subcategory: {
    path: (categorySlug: string, subcategorySlug: string) => '/categories/' + categorySlug + '/' + subcategorySlug,
    name: 'categories-slug-subslug'
  },
  post: {
    path: (slug: string) => '/posts/' + slug,
    name: 'posts-slug'
  },
  search: {
    path: (q: string) => '/search?q=' + q,
    name: 'search'
  },
  contact: {
    path: '/contact',
    name: 'contact'
  },
}