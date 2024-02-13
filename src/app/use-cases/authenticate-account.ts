import { Either, left, right } from '@/core/either';
import { AccountsRepository } from '../repositories/accounts-repository';
import { Hasher } from '../crypto/hasher';
import { Encoder } from '../crypto/encoder';
import { UnauthorizedError } from './errors/unauthorized';

interface AuthenticateAccountRequest {
  email: string;
  password: string;
}

type AuthenticateAccountResponse = Either<
  UnauthorizedError,
  {
    accessToken: string;
  }
>;

export class AuthenticateAccountUseCase {
  constructor(
    private accountsRepo: AccountsRepository,
    private hasher: Hasher,
    private encoder: Encoder,
  ) {}

  async execute(
    request: AuthenticateAccountRequest,
  ): Promise<AuthenticateAccountResponse> {
    const { email, password } = request;

    const account = await this.accountsRepo.findByEmail(email);

    if (!account) {
      return left(new UnauthorizedError('Invalid credentials.'));
    }

    const isPasswordValid = await this.hasher.compare(
      password,
      account.password,
    );

    if (!isPasswordValid) {
      return left(new UnauthorizedError('Invalid credentials.'));
    }

    const accessToken = await this.encoder.encode({ sub: account.id });

    return right({ accessToken });
  }
}
