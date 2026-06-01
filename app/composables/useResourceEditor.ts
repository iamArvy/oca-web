// import { toTypedSchema } from '@vee-validate/zod';
// import { useForm } from 'vee-validate';
// import type {
//   infer,
//   ZodObject,
//   ZodRawShape,
// } from 'zod';
// import type * as z from 'zod';

// interface ResourceEndpoints {
//   create: string;
//   update: (id: string) => string;
// }

// interface ResourceDefinition<
//   TSchema extends z.ZodObject<z.ZodRawShape>,
//   TItem = unknown,
// > {
//   schema: TSchema;

//   endpoints: ResourceEndpoints;

//   transformInitialValues?: (
//     item?: TItem | null,
//   ) => Partial<z.infer<TSchema>> | undefined;

//   beforeSubmit?: (
//     values: z.infer<TSchema>,
//   ) =>
//     | Promise<z.infer<TSchema>>
//     | z.infer<TSchema>;

//   onSuccess?: () => Promise<void> | void;
// }

// interface UseEditorOptions<
//   TSchema extends z.ZodObject<z.ZodRawShape>,
//   TItem = unknown,
// > {
//   resource: ResourceDefinition<
//     TSchema,
//     TItem
//   >;

//   mode?: 'create' | 'edit';

//   item?: TItem | null;
// }

// type FormFields<T> = {
//   [K in keyof T]: Ref<T[K]>;
// };

// export function useEditor<
//   TSchema extends ZodObject<ZodRawShape>,
//   TItem extends { id: string },
// >({
//   resource,
//   mode = 'create',
//   item,
// }: UseEditorOptions<TSchema, TItem>) {
//   type Values = z.infer<TSchema>;

//   const { $api } = useNuxtApp();

//   const {
//     defineField,
//     handleSubmit,
//     errors,
//     values,
//     setValues,
//     isSubmitting,
//     resetForm,
//   } = useForm<Values>({
//     validationSchema: toTypedSchema(
//       resource.schema,
//     ),

//     initialValues:
//       resource.transformInitialValues?.(
//         item,
//       ),
//   });

//   const fields = {} as FormFields<Values>;

//   const keys = Object.keys(
//     resource.schema.shape,
//   ) as Array<keyof Values>;

//   for (const key of keys) {
//     const [field] = defineField(key as any);

//     fields[key] = field;
//   }

//   const submit = handleSubmit(
//     async (formValues) => {
//       let body = formValues;

//       if (resource.beforeSubmit) {
//         body = await resource.beforeSubmit(
//           formValues,
//         );
//       }

//       if (mode === 'edit' && item) {
//         await $api(
//           resource.endpoints.update(
//             item.id,
//           ),
//           {
//             method: 'PATCH',
//             body,
//           },
//         );
//       } else {
//         await $api(
//           resource.endpoints.create,
//           {
//             method: 'POST',
//             body,
//           },
//         );
//       }

//       await resource.onSuccess?.();
//     },
//   );

//   return {
//     ...fields,

//     errors,

//     values,

//     setValues,

//     resetForm,

//     isSubmitting,

//     submit,
//   };
// }