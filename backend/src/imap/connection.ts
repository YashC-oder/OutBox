import { ImapFlow } from 'imapflow';
import { AddressObject, simpleParser } from 'mailparser';
import { classifyEmail } from '../ai/classifier';
import { indexEmail } from '../elasticsearch/indexer';
import { Account } from '../models/Email/AccountModel';
import { EmailCategory, Email } from '../models/Email/EmailModel';
import { sendToClients } from '../websocket/server';
import { triggerWebhook } from '../integerations/actions';

export async function startConnectionForAccount(acc: Account) {
  const client = new ImapFlow({
    host: acc.host,
    port: acc.port,
    secure: acc.tls,
    auth: { user: acc.user, pass: acc.password },
  });

  await client.connect();
  await client.mailboxOpen('INBOX');

  for await (const msg of client.fetch({ since: new Date(Date.now() - 864e6) }, { source: true })) {
    if (msg.source) await handleEmail(acc.user, msg.source);
  }

  client.on('exists', async () => {
    const seq = client.mailbox ? client.mailbox.exists : 0;
    const newMsg = await client.fetchOne(seq, { source: true });
    if (newMsg && newMsg?.source) await handleEmail(acc.user, newMsg.source);
  });
}

async function handleEmail(accountUser: string, source: Buffer | string) {
  const parsed = await simpleParser(source);
  const category: EmailCategory = await classifyEmail(parsed.text || '');
  
  const email: Email = {
    from: parsed.from?.text || '',
    to: formatAddresses(parsed.to) || '',
    subject: parsed.subject || '',
    text: parsed.text || '',
    html: parsed.html || '',
    date: parsed.date?.toISOString() || new Date().toISOString(),
    folder: 'INBOX',
    account: accountUser,
    category,
    sync: true,
  };
  // Save the email to the database or index it
  await indexEmail(email);
  // If the email is categorized as 'Interested', trigger a webhook
  if(category === 'Interested') triggerWebhook(email);
  // Notify clients about the new email
  if (email.sync) sendToClients(email);
}

function formatAddresses(addresses?: AddressObject | AddressObject[]): string {
  if (!addresses) return '';
  const addressObjects = Array.isArray(addresses) ? addresses : [addresses];
  return addressObjects.map(obj => obj.text).join(', ');
}
