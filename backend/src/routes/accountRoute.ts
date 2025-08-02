import express from 'express';
import { Account } from '../models/Email/AccountModel';
import { startConnectionForAccount } from '../imap/connection';

const router = express.Router();
const activeAccounts: Account[] = [];

router.post('/add', async (req, res) => {
  const account: Account = req.body;
  activeAccounts.push(account);
  await startConnectionForAccount(account);
  res.send({ status: 'Account added and IMAP connection started' });
});

export default router;
