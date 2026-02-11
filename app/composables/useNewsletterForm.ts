import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const useNewsletterForm = () => {
  const { success } = useToast()
  const formSchema = toTypedSchema(z.object({
    email: z.string().email().nonempty('Email is required'),
  }))

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  success('Thank you for subscribing to our newsletter!')
})

  

  return {
    onSubmit,
    isSubmitting
  }
}