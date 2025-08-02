import { startConnectionForAccount } from '../imap/connection';
import { Account } from '../models/Email/AccountModel';

const accountList: Account[] = [];

export function getAccounts(): Account[] {
  return accountList;
}

export async function addAccount(account: Account) {
  accountList.push(account);
  await startConnectionForAccount(account);
}
