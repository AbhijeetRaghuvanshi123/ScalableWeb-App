import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';

router.post('/register', validate(['name', 'email', 'password']), registerUser);
router.post('/login', validate(['email', 'password']), loginUser);

export default router;
