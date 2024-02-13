import { PrismaClient } from '@prisma/client';

export class Prisma {
  static client = new PrismaClient();
}
