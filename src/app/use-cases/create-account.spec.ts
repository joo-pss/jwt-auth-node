import { CreateAccountUseCase } from './create-account';
import { ConflictError } from './errors/conflict';
import { TestAccountsRepository } from '@test/repositories/test-accounts-repository';
import { TestHasher } from '@test/crypto/test-hasher';
import { TestEncoder } from '@test/crypto/test-encoder';

describe('create account use case', () => {
  let accountsRepo: TestAccountsRepository;
  let hasher: TestHasher;
  let encoder: TestEncoder;
  let sut: CreateAccountUseCase;

  beforeEach(() => {
    accountsRepo = new TestAccountsRepository();
    hasher = new TestHasher();
    encoder = new TestEncoder();
    sut = new CreateAccountUseCase(accountsRepo, hasher, encoder);
  });

  const request = {
    name: 'John Doe',
    email: 'test@email.com',
    password: 'password',
  };

  it('should create an account and return access token', async () => {
    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not create an account if email is already been taken', async () => {
    await sut.execute(request);

    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ConflictError);
  });
});
