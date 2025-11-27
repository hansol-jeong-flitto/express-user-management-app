import { z } from 'zod';

export const CreateUserSettingSchema = z.object({
  userId: z.number().int().positive("userId must be a positive integer"),
  language: z.string().min(2, "Language must be at least 2 characters").max(10, "Language must be at most 10 characters"),
  emailNotification: z.boolean(),
});
