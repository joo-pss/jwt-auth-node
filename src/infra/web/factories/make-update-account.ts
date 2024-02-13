import { UpdateAccountUseCase } from '@/app/use-cases/update-account';
import { PrismaAccountsRepository } from '@/infra/database/repositories/prisma-accounts-repository';
import { BcryptHasher } from '@/infra/crypto/bcrypt-hasher';

export function makeUpdateAccountUseCase() {
  const accountsRepo = new PrismaAccountsRepository();
  const hasher = new BcryptHasher();

  return new UpdateAccountUseCase(accountsRepo, hasher);
}
