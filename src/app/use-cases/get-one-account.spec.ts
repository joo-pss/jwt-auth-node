import { Account } from '@/domain/account';
import { GetOneAccountUseCase } from './get-one-account';
import { NotFoundError } from './errors/not-found';
import { TestAccountsRepository } from '@test/repositories/test-accounts-repository';
import { makeAccount } from '@test/factories/make-account';

describe('get one account use case', () => {
  let accountsRepo: TestAccountsRepository;
  let sut: GetOneAccountUseCase;

  beforeEach(() => {
    accountsRepo = new TestAccountsRepository();
    sut = new GetOneAccountUseCase(accountsRepo);
  });

  const request = {
    id: '1',
  };

  it('should return an existing account', async () => {
    await accountsRepo.create(makeAccount({}, '1'));

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeInstanceOf(Account);
  });

  it('should not return a non-existing account', async () => {
    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
