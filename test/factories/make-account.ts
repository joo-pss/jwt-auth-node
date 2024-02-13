import { Account, AccountProps } from '@/domain/account';

export function makeAccount(override?: Partial<AccountProps>, id?: string) {
  return Account.create(
    {
      name: 'John Doe',
      email: 'test@email.com',
      password: 'password',
      ...override,
    },
    id,
  );
}
