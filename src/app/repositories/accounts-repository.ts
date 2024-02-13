import { Account } from '@/domain/account';

export interface AccountsRepository {
  create(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findByEmail(email: string): Promise<Account | null>;
  update(id: string, account: Account): Promise<void>;
  delete(id: string): Promise<void>;
}
