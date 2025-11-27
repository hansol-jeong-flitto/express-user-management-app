import { z } from 'zod';

export const UpdateUserSettingSchema = z.object({
  language: z.string().min(2, "Language must be at least 2 characters").max(10, "Language must be at most 10 characters").optional(),
  emailNotification: z.boolean().optional(),
});
