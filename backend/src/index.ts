import express from 'express';
import emailRoute from './routes/emailRoute';
import accountRoute from './routes/accountRoute';
import './websocket/server';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/emails', emailRoute);
app.use('/accounts', accountRoute);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

export default app;