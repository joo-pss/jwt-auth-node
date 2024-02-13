import { CreateAccountUseCase } from '@/app/use-cases/create-account';
import { PrismaAccountsRepository } from '@/infra/database/repositories/prisma-accounts-repository';
import { BcryptHasher } from '@/infra/crypto/bcrypt-hasher';
import { JwtEncoder } from '@/infra/crypto/jwt-encoder';

export function makeCreateAccountUseCase() {
  const accountsRepo = new PrismaAccountsRepository();
  const hasher = new BcryptHasher();
  const encoder = new JwtEncoder();

  return new CreateAccountUseCase(accountsRepo, hasher, encoder);
}
