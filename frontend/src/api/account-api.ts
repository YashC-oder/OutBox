import { Account } from "@/models/Account";
import { BASE_URL } from "@/utils/constants";

export async function addAccount(account: Account) {
  const res = await fetch(`${BASE_URL}/accounts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(account),
  });

  if (!res.ok) throw new Error('Failed to add account');
  
  return res.json();
}