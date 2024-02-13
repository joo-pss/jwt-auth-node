import { Either, left, right } from '@/core/either';
import { AccountsRepository } from '../repositories/accounts-repository';
import { Hasher } from '../crypto/hasher';
import { NotFoundError } from './errors/not-found';
import { ConflictError } from './errors/conflict';

interface UpdateAccountRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UpdateAccountResponse = Either<NotFoundError | ConflictError, null>;

export class UpdateAccountUseCase {
  constructor(
    private accountsRepo: AccountsRepository,
    private hasher: Hasher,
  ) {}

  async execute(request: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    const { id, name, email, password } = request;

    const account = await this.accountsRepo.findById(id);

    if (!account) {
      return left(new NotFoundError('Account not found.'));
    }

    const isEmailTaken = await this.accountsRepo.findByEmail(email);

    if (isEmailTaken && isEmailTaken.id !== id) {
      return left(new ConflictError('This email is already been taken.'));
    }

    account.name = name;
    account.email = email;
    account.password = await this.hasher.hash(password);

    await this.accountsRepo.update(id, account);

    return right(null);
  }
}
