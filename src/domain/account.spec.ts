import { Account } from './account';
import { makeAccount } from '@test/factories/make-account';

describe('account entity', () => {
  it('should create an account instance with random id and creation date', () => {
    const account = makeAccount();

    expect(account).toBeInstanceOf(Account);
    expect(account).toHaveProperty('id');
    expect(account).toHaveProperty('createdAt');
  });

  it('should create an account instance with provided id and creation date', () => {
    const createdAt = new Date();
    const account = makeAccount({ createdAt }, '1');

    expect(account.id).toBe('1');
    expect(account.createdAt).toBe(createdAt);
  });
});
