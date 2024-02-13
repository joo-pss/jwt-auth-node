import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Provide a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});
