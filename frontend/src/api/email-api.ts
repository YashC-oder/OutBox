import { EmailStatus, Email } from "@/models/Email";
import { BASE_URL } from "../utils/constants";

const allowedStatuses: EmailStatus[] = [
  'Interested',
  'Meeting Booked',
  'Not Interested',
  'Spam',
  'Out of Office',
];

export interface EmailSearchFilter {
  folder?: string;
  category?: string;
  account?: string;
}

function isValidStatus(status: string): status is EmailStatus {
  return allowedStatuses.includes(status as EmailStatus);
}

function sanitizeEmails(data: any[]): Email[] {
  return data
    .filter((e) => isValidStatus(e.category))
    .map((e) => ({
      ...e,
      category: e.category as EmailStatus,
    }));
}

export async function getAllEmails(): Promise<Email[]> {
  const res = await fetch(`${BASE_URL}/emails/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  if (!res.ok) throw new Error('Failed to fetch emails');

  const data = await res.json();
  return sanitizeEmails(data);
}

export async function searchEmails(filter: EmailSearchFilter): Promise<Email[]> {
  const res = await fetch(`${BASE_URL}/emails/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filter),
  });

  if (!res.ok) throw new Error('Failed to search emails');

  const data = await res.json();
  return sanitizeEmails(data);
}