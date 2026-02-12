import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const useNewsletterForm = () => {
  const { success, error } = useToast()
  const formSchema = toTypedSchema(z.object({
    email: z.string().email().nonempty('Email is required'),
  }))

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
  const response = await $fetch('/api/newsletter', {
    method: 'POST',
    body: values,
  })
  console.log('Newsletter subscription response:', response)
  if (!response.success) {
    error(response.message || 'Subscription failed. Please try again.')
    return
  }
  success('Thank you for subscribing to our newsletter!')
  } catch (e) {
    error('An error occurred while subscribing to the newsletter. Please try again.')
  }
})

  

  return {
    onSubmit,
    isSubmitting
  }
}