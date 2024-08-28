import { z } from 'zod';
import { userResponseSchema, userSchema } from '../schema/userSchema';

export type User = z.infer<typeof userSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
