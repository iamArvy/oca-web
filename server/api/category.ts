import { mockGetCategoryBySlug, mockGetPosts, mockGetSubcategoryBySlug } from "~/lib/mocks";

export default defineEventHandler(async (event) => {
  const slug = getQuery(event).slug as string;
  if (!slug) {
    // Immediately return 400
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
  }
  const category = mockGetCategoryBySlug(slug);
  if (!category) {
    // Post not found → throw 404
    throw createError({ statusCode: 404, statusMessage: 'Category not found' });
  }
  const posts = mockGetPosts({ category: category.id });
  const data = {
    ...category,
    posts: posts
  };
  return data;
});