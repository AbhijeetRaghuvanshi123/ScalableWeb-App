import express from 'express';
const router = express.Router();
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
