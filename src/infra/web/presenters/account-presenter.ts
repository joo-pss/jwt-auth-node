import { Account } from '@/domain/account';

export class AccountPresenter {
  static toWeb(account: Account) {
    return {
      name: account.name,
      email: account.email,
      createdAt: this.formateDate(account.createdAt!),
    };
  }

  private static formateDate(date: Date) {
    return Intl.DateTimeFormat('en-US').format(date);
  }
}
