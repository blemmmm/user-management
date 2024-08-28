import { z } from 'zod';

export const userSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
});

export const userResponseSchema = z.object({
  success: z.boolean(),
  users: z.array(userSchema),
});
