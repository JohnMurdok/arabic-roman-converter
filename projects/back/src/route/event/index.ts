import express from 'express';
import eventController from '@controllers/event';
const router = express.Router();

router.get('/register', eventController.register);
export default router;
