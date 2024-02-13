import { AuthenticateAccountUseCase } from './authenticate-account';
import { UnauthorizedError } from './errors/unauthorized';
import { TestAccountsRepository } from '@test/repositories/test-accounts-repository';
import { TestHasher } from '@test/crypto/test-hasher';
import { TestEncoder } from '@test/crypto/test-encoder';
import { makeAccount } from '@test/factories/make-account';

describe('authenticate account use case', () => {
  let accountsRepo: TestAccountsRepository;
  let hasher: TestHasher;
  let encoder: TestEncoder;
  let sut: AuthenticateAccountUseCase;

  beforeEach(() => {
    accountsRepo = new TestAccountsRepository();
    hasher = new TestHasher();
    encoder = new TestEncoder();
    sut = new AuthenticateAccountUseCase(accountsRepo, hasher, encoder);
  });

  const request = {
    email: 'test@email.com',
    password: 'password',
  };

  it('should authenticate an account and return access token', async () => {
    await accountsRepo.create(
      makeAccount({ password: request.password.concat('_hashed') }),
    );

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not authenticate an account if email is invalid', async () => {
    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UnauthorizedError);
  });

  it('should not authenticate an account if password is invalid', async () => {
    await accountsRepo.create(
      makeAccount({ password: request.password.concat('_hashed') }),
    );

    const result = await sut.execute({
      ...request,
      password: 'invalid',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UnauthorizedError);
  });
});
