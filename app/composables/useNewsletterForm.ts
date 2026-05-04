import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { API_ROUTES } from '~/constants/api-routes'

export const useNewsletterForm = () => {
  const { success, error } = useToast()
  const formSchema = toTypedSchema(z.object({
    email: z.string().email().nonempty('Email is required'),
  }))

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const { $api } = useNuxtApp();

const onSubmit = handleSubmit(async (values) => {
  try {
    await $api(API_ROUTES.subscribe.path, {
      method: 'POST',
      body: values,
    })
    success('Thank you for subscribing to our newsletter!')
  } catch (e: unknown) {
    error(handleError(e, "Subscription failed. Please try again."));
  }
})

  

  return {
    onSubmit,
    isSubmitting
  }
}