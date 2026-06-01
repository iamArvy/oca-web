import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const topicSchema = z.object({
  name: z
    .string()
    .min(2, "Topic name must be at least 2 characters")
    .max(50),
  keywords: z.array(z.string()).optional(),
  parentId: z.string().optional(),
})

export type TopicSchema = z.infer<typeof topicSchema>;

export const TopicValidationSchema = toTypedSchema(topicSchema);
