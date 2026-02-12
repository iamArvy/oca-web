import { z } from 'zod'

const filtersSchema = z.object({
  email: z.string().email().nonempty('Email is required'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = filtersSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues.map(e => e.message).join(', '),
    })
  }
  try{
    const { email } = result.data
    const { addSubscriber } = useMailchimp()

    const response = await addSubscriber(email)
    if (!response.success) {
      throw createError({ statusCode: 400, statusMessage: response.message })
    }

    return { success: true, message: 'Successfully subscribed!' }
  }catch(e){
    console.log('Error subscribing to newsletter:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
