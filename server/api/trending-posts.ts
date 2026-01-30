import { getPost } from '../../app/lib/mocks'

export default defineEventHandler(async (event) => {
  const slug = getQuery(event).slug as string
  if (!slug) {
    // Immediately return 400
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const data = getPost(slug)
  if (!data) {
    // Post not found → throw 404
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  return data
})
