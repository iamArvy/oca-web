import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import {
  loginSchema,
  type LoginSchema,
} from '~/schemas';

import { API_ROUTES } from '~/constants';

export const useLoginForm = () => {
  const {
    defineField,
    handleSubmit,
    errors,
    isSubmitting,
  } = useForm({
    validationSchema: toTypedSchema(loginSchema),
  });

  const [email] = defineField('email');

  const [password] = defineField('password');

  const { $api } = useNuxtApp()
  const { error:toastError, success } = useToast()
  const { query } = useRoute();
  const redirectPath = (query.redirect as string) || "/";

  const submit = handleSubmit(
    async (values: LoginSchema) => {
      try{
        await $api(API_ROUTES.login.path, {
          method: 'POST',
          body: values,
        });
        success('Login Successful');
        await useAuth().fetchUser();
        navigateTo(redirectPath);
      }catch(error){
        toastError(handleError(error))
      }
    },
  );

  return {
    email,
    password,
    errors,
    isSubmitting,
    submit,
  };
};