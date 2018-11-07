import express from 'express';
import ingestController from '../controllers/ingest.controller'

const router = express.Router();

router.route('/hacker-news').get(ingestController.hackerNews);

export default router;
