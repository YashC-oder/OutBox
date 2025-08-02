import WebSocket, { WebSocketServer } from 'ws';
import { Email } from '../models/Email/EmailModel';

const wsServer = new WebSocketServer({ port: 8080 });
const accountSockets = new Map<string, WebSocket[]>();

wsServer.on('connection', (ws) => {
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      if (message.type === 'subscribe' && message.account) {
        const sockets = accountSockets.get(message.account) || [];
        sockets.push(ws);
        accountSockets.set(message.account, sockets);
      }
    } catch (error) {
      console.error('Invalid WebSocket message', error);
    }
  });

  ws.on('close', () => {
    for (const [account, sockets] of accountSockets.entries()) {
      accountSockets.set(
        account,
        sockets.filter((client) => client !== ws && client.readyState === WebSocket.OPEN)
      );
    }
  });
});

export function sendToClients(email: Email) {
  const sockets = accountSockets.get(email.account);
  if (!sockets) return;

  for (const client of sockets) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'new-email', payload: email }));
    }
  }
}

export { wsServer };