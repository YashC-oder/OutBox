import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const ACCOUNTS_FILE = path.join(__dirname, '../../config/accounts.json');

export async function addAccount(req: Request, res: Response) {
  const { user, password, host, port, tls } = req.body;

  if (!user || !password || !host || !port) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const existing = JSON.parse(await fs.readFile(ACCOUNTS_FILE, 'utf-8'));
  existing.push({ user, password, host, port, tls });

  await fs.writeFile(ACCOUNTS_FILE, JSON.stringify(existing, null, 2));
  return res.status(201).json({ message: 'Account added successfully' });
}
