import express from 'express';
import cors from 'cors';
import emailRoute from './routes/emailRoute';
import accountRoute from './routes/accountRoute';
import './websocket/server';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3001',"*"],
}));

app.use(express.json());

app.use('/emails', emailRoute);
app.use('/accounts', accountRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
