import { AuthenticateAccountUseCase } from '@/app/use-cases/authenticate-account';
import { PrismaAccountsRepository } from '@/infra/database/repositories/prisma-accounts-repository';
import { BcryptHasher } from '@/infra/crypto/bcrypt-hasher';
import { JwtEncoder } from '@/infra/crypto/jwt-encoder';

export function makeAuthenticateAccountUseCase() {
  const accountsRepo = new PrismaAccountsRepository();
  const hasher = new BcryptHasher();
  const encoder = new JwtEncoder();

  return new AuthenticateAccountUseCase(accountsRepo, hasher, encoder);
}
