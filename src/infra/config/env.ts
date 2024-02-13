import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(30),
  PORT: z.coerce.number().optional().default(3000),
});

export const env = envSchema.parse(process.env);
