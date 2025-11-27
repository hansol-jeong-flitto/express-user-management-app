import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.email("Invalid email address").optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  userGroupId: z.number().int().positive("userGroupId must be a positive integer").optional(),
});
