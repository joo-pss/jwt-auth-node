import { Either, left, right } from '@/core/either';
import { AccountsRepository } from '../repositories/accounts-repository';
import { NotFoundError } from './errors/not-found';

interface DeleteAccountRequest {
  id: string;
}

type DeleteAccountResponse = Either<NotFoundError, null>;

export class DeleteAccountUseCase {
  constructor(private accountsRepo: AccountsRepository) {}

  async execute(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const { id } = request;

    const account = await this.accountsRepo.findById(id);

    if (!account) {
      return left(new NotFoundError('Account not found.'));
    }

    await this.accountsRepo.delete(id);

    return right(null);
  }
}
