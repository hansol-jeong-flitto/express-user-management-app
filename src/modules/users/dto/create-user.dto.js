import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"), // No hashing here as per user's request
  userGroupId: z.number().int().positive("userGroupId must be a positive integer"),
});
