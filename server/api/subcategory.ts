import { mockGetPosts, mockGetSubcategoryBySlug } from "~/lib/mocks";

export default defineEventHandler(async (event) => {
  const categorySlug = getQuery(event).slug as string;
  const subcategorySlug = getQuery(event).subSlug as string;
  if (!categorySlug || !subcategorySlug) {
    // Immediately return 400
    throw createError({ statusCode: 400, statusMessage: 'Slug and subslug are required' });
  }
  const category = mockGetSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!category) {
    // Post not found → throw 404
    throw createError({ statusCode: 404, statusMessage: 'Subcategory not found' });
  }
  const posts = mockGetPosts({ subcategory: category.id });
  const data = {
    ...category,
    posts: posts
  };
  return data;
});