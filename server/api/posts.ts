import {  mockGetPosts } from '~/lib/mocks'

import { z } from 'zod'

const filtersSchema = z.object({
  category: z.string().optional(),
  subcategory: z.string().optional(),
  limit: z
    .string()
    .transform((v) => parseInt(v))
    .refine((n) => !isNaN(n) && n > 0 && n <= 100, 'Limit must be 1-100')
    .optional(),
  page: z
    .string()
    .transform((v) => parseInt(v))
    .refine((n) => !isNaN(n) && n >= 1, 'Page must be >= 1')
    .optional(),
  q: z.string().optional(),
  trending: z
    .preprocess((val) => {
      if (val === 'true') return true
      if (val === 'false') return false
      return val
    }, z.boolean())
    .optional(),
  hotTopic: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const result = filtersSchema.safeParse(query)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues.map(e => e.message).join(', '),
    })
  }
  try{
    const data = mockGetPosts(result.data)
    return data
  }catch(e){
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
