import express from 'express';
import { getAllEmails, searchEmailsByFilter } from '../elasticsearch/search';

const router = express.Router();

router.get('/', async (req, res) => {
  const emails = await getAllEmails();
  res.send(emails);
});

// router.post('/send', async (req, res) => {
//   const email: Email = req.body;
//   await indexEmail(email);
//   res.send({ status: 'Email indexed' });
// });

router.post('/search', async (req, res) => {
  const results = await searchEmailsByFilter(req.body);
  res.send(results);
});

export default router;
