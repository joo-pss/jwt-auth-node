import { Account } from '@/domain/account';
import { AccountsRepository } from '@/app/repositories/accounts-repository';

export class TestAccountsRepository implements AccountsRepository {
  private accounts: Set<Account> = new Set();

  async create(account: Account) {
    this.accounts.add(account);

    return account;
  }

  async findById(id: string) {
    for (const account of this.accounts) {
      if (account.id === id) {
        return account;
      }
    }

    return null;
  }

  async findByEmail(email: string) {
    for (const account of this.accounts) {
      if (account.email === email) {
        return account;
      }
    }

    return null;
  }

  async update(id: string, account: Account) {
    for (const account of this.accounts) {
      if (account.id === id) {
        this.accounts.delete(account);
      }
    }

    this.accounts.add(account);
  }

  async delete(id: string) {
    for (const account of this.accounts) {
      if (account.id === id) {
        this.accounts.delete(account);
      }
    }
  }
}
