import { Either, left, right } from '@/core/either';
import { Account } from '@/domain/account';
import { AccountsRepository } from '../repositories/accounts-repository';
import { Hasher } from '../crypto/hasher';
import { Encoder } from '../crypto/encoder';
import { ConflictError } from './errors/conflict';

interface CreateAccountRequest {
  name: string;
  email: string;
  password: string;
}

type CreateAccountResponse = Either<
  ConflictError,
  {
    accessToken: string;
  }
>;

export class CreateAccountUseCase {
  constructor(
    private accountsRepo: AccountsRepository,
    private hasher: Hasher,
    private encoder: Encoder,
  ) {}

  async execute(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const { email, password } = request;

    const isEmailTaken = await this.accountsRepo.findByEmail(email);

    if (isEmailTaken) {
      return left(new ConflictError('This email is already been taken.'));
    }

    const hashedPassword = await this.hasher.hash(password);

    const newAccount = await this.accountsRepo.create(
      Account.create({
        ...request,
        password: hashedPassword,
      }),
    );

    const accessToken = await this.encoder.encode({ sub: newAccount.id });

    return right({ accessToken });
  }
}
