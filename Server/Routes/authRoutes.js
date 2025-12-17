// routes/authRoutes.js
// Express routes for authentication

import express from 'express';
import {
  signup,
  login,
  me,
  logout,
} from '../Controllers/authController.js';
import { validateSignup, validateLogin } from '../Middleware/validate.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, me);

export default router;