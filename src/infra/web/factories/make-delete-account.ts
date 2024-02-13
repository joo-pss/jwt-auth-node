import { DeleteAccountUseCase } from '@/app/use-cases/delete-account';
import { PrismaAccountsRepository } from '@/infra/database/repositories/prisma-accounts-repository';

export function makeDeleteAccountUseCase() {
  const accountsRepo = new PrismaAccountsRepository();

  return new DeleteAccountUseCase(accountsRepo);
}
