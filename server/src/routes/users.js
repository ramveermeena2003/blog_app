import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { authRequired, requireAdmin } from '../middleware/auth.js';
const router = express.Router();
router.get('/me', authRequired, async (req, res) => {
  const me = await User.findById(req.user.id).select('-password');
  const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
  res.json({ user: me, posts });
});
router.get('/', authRequired, requireAdmin, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});
export default router;
