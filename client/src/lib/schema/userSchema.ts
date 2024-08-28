import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9_]+$/),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
});

export const userResponseSchema = z.object({
  success: z.boolean(),
  users: z.array(userSchema),
});
