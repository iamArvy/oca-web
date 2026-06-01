import { API_ROUTES } from "~/constants";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import type { ApiResponse } from "~/types";

export enum ContactType {
  DISPLAY = 'display',
  SPONSORED = 'sponsored',
  NEWSLETTER = 'newsletter',
  PARTNERSHIP = 'partnership',
  OTHER = 'other',
}

export const contactTypeOptions = [
  { label: 'Display Advertising', value: ContactType.DISPLAY },
  { label: 'Sponsored Content', value: ContactType.SPONSORED },
  { label: 'Newsletter Sponsorship', value: ContactType.NEWSLETTER },
  { label: 'Brand Partnership', value: ContactType.PARTNERSHIP },
  { label: 'Other', value: ContactType.OTHER },
];

export function useContactForm() {
    const { success, error } = useToast();
    const { $api } = useNuxtApp();

  const formSchema = toTypedSchema(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
        email: z.string().email("Invalid email address"),
        message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
        type: z.nativeEnum(ContactType, { errorMap: () => ({ message: "Please select a valid inquiry type" }) }),
        company: z.string().max(100, "Company name must be less than 100 characters").optional(),
      }),
    );
    const { handleSubmit, isSubmitting, values, handleReset } = useForm({ validationSchema: formSchema });
    const submit = handleSubmit(async (values) => {
      try {
        await $api<ApiResponse<Comment>>(API_ROUTES.public.contact, {
          method: "POST",
          body: values,
        });
        handleReset()
        success(
          'Message Sent!',
          'Thank you for your inquiry. Our team will get back to you within 24-48 hours.'
        );
      } catch (err: any) {
        console.log(err);
        error(err?.statusMessage || 'Something went wrong');
      }
    });


  return { 
    submit,
    isSubmitting,
    values,
  };
}