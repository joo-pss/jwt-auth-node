import { z } from 'zod';

export const authenticateAccountSchema = z.object({
  email: z.string().email('Email is required.'),
  password: z.string().min(1, 'Password is required.'),
});
