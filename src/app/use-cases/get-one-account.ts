import { Either, left, right } from '@/core/either';
import { Account } from '@/domain/account';
import { AccountsRepository } from '../repositories/accounts-repository';
import { NotFoundError } from './errors/not-found';

interface GetOneAccountRequest {
  id: string;
}

type GetOneAccountResponse = Either<NotFoundError, Account>;

export class GetOneAccountUseCase {
  constructor(private accountsRepo: AccountsRepository) {}

  async execute(request: GetOneAccountRequest): Promise<GetOneAccountResponse> {
    const { id } = request;

    const account = await this.accountsRepo.findById(id);

    if (!account) {
      return left(new NotFoundError('Account not found.'));
    }

    return right(account);
  }
}
