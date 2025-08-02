export type EmailStatus = 'Interested' | 'Meeting Booked' | 'Not Interested' | 'Spam' | 'Out of Office';

export interface Email {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  date?: string;
  folder: string;
  account: string;
  category: EmailStatus;
}