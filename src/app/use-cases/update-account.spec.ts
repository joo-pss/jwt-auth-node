import { UpdateAccountUseCase } from './update-account';
import { NotFoundError } from './errors/not-found';
import { ConflictError } from './errors/conflict';
import { TestAccountsRepository } from '@test/repositories/test-accounts-repository';
import { TestHasher } from '@test/crypto/test-hasher';
import { makeAccount } from '@test/factories/make-account';

describe('update account use case', () => {
  let accountsRepo: TestAccountsRepository;
  let hasher: TestHasher;
  let sut: UpdateAccountUseCase;

  beforeEach(() => {
    accountsRepo = new TestAccountsRepository();
    hasher = new TestHasher();
    sut = new UpdateAccountUseCase(accountsRepo, hasher);
  });

  const request = {
    id: '1',
    name: 'Johnie Doe',
    email: 'email@email.com',
    password: 'newPassword',
  };

  it('should update an existing account', async () => {
    await accountsRepo.create(makeAccount({}, '1'));

    const result = await sut.execute(request);
    const updatedAccount = await accountsRepo.findById('1');

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeNull();
    expect(updatedAccount?.password).toBe(request.password.concat('_hashed'));
  });

  it('should not update a non-existing account', async () => {
    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });

  it('should not update an account if email is already been taken', async () => {
    await Promise.all([
      accountsRepo.create(makeAccount({ email: request.email }, '1')),
      accountsRepo.create(makeAccount({}, '2')),
    ]);

    const result = await sut.execute({
      ...request,
      email: 'test@email.com',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ConflictError);
  });
});
