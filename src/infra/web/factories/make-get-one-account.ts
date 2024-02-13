import { GetOneAccountUseCase } from '@/app/use-cases/get-one-account';
import { PrismaAccountsRepository } from '@/infra/database/repositories/prisma-accounts-repository';

export function makeGetOneAccountUseCase() {
  const accountsRepo = new PrismaAccountsRepository();

  return new GetOneAccountUseCase(accountsRepo);
}
