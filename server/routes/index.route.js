import express from 'express';
import ingestRoutes from './ingest.route';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) => 
  res.send('OK'));

router.use('/ingest', ingestRoutes);

export default router;
