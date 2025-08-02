import axios from 'axios';
const id:string = process.env.WEBHOOK_ID || 'webhook-id';

export function triggerWebhook(email: any) {
  return axios.post(`https://webhook.site/${id}`, {
    from: email.from.text,
    subject: email.subject,
    category: 'Interested',
  });
}
