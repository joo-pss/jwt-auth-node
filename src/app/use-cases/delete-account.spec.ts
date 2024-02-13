import { DeleteAccountUseCase } from './delete-account';
import { NotFoundError } from './errors/not-found';
import { TestAccountsRepository } from '@test/repositories/test-accounts-repository';
import { makeAccount } from '@test/factories/make-account';

describe('delete account use case', () => {
  let accountsRepo: TestAccountsRepository;
  let sut: DeleteAccountUseCase;

  beforeEach(() => {
    accountsRepo = new TestAccountsRepository();
    sut = new DeleteAccountUseCase(accountsRepo);
  });

  const request = {
    id: '1',
  };

  it('should delete an existing account', async () => {
    await accountsRepo.create(makeAccount({}, '1'));

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeNull();
  });

  it('should not delete a non-existing account', async () => {
    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
