import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import {
  registerSchema,
  type RegisterSchema,
} from '~/schemas';

import { API_ROUTES } from '~/constants';

export const useRegisterForm = () => {
  const {
    defineField,
    handleSubmit,
    errors,
    isSubmitting,
  } = useForm({
    validationSchema: toTypedSchema(registerSchema),
  });

  const [email] = defineField('email');

  const [password] = defineField('password');

  const [name] = defineField('name');

  const { $api } = useNuxtApp()
  const { error:toastError, success } = useToast()

  const submit = handleSubmit(
    async (values: RegisterSchema) => {
      try{
          await $api(API_ROUTES.register.path, {
            method: 'POST',
            body: values,
          });
          success('Registration Successful');
          await useAuth().fetchUser();
        }catch(error){
          toastError(handleError(error))
        }

      await navigateTo('/verify-email');
    },
  );

  return {
    email,
    password,
    name,
    errors,
    isSubmitting,
    submit,
  };
};