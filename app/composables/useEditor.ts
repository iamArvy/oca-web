// import { useForm } from 'vee-validate';
// import { toTypedSchema } from '@vee-validate/zod';
// import type * as z from 'zod';
// import type { ZodObject, ZodRawShape } from 'zod';

// interface UseApiFormOptions<TSchema extends ZodObject<ZodRawShape>> {
//   schema: TSchema;
//   endpoint: string;
//   method?: 'POST' | 'PUT' | 'PATCH';
//   onSuccess?: (
//     values: z.infer<TSchema>,
//   ) => Promise<void> | void;
// }

// export const useApiForm = <
//   TSchema extends ZodObject<ZodRawShape>,
// >(
//   options: UseApiFormOptions<TSchema>,
// ) => {
//   type Values = z.infer<TSchema>;

//   const {
//     defineField,
//     handleSubmit,
//     errors,
//     isSubmitting,
//   } = useForm<Values>({
//     validationSchema: toTypedSchema(options.schema),
//   });

//   const { $api } = useNuxtApp();
//   const { error: toastError } = useToast();

//   const fields = {} as Record<
//     keyof Values,
//     ReturnType<typeof defineField>[0]
//   >;

//   for (const key of Object.keys(options.schema.shape)) {
//     fields[key as keyof Values] =
//       defineField(key)[0];
//   }

//   const submit = handleSubmit(async (values) => {
//     try {
//       await $api(options.endpoint, {
//         method: options.method || 'POST',
//         body: values,
//       });

//       await options.onSuccess?.(values);
//     } catch (error) {
//       toastError(handleError(error));
//     }
//   });

//   return {
//     ...fields,
//     errors,
//     isSubmitting,
//     submit,
//   };
// };