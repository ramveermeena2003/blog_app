import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { authRequired } from '../middleware/auth.js';
const router = express.Router();
router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .sort({ createdAt: -1 })
    .populate('author','name');
  res.json(comments);
});
router.post('/:postId', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const comment = await Comment.create({ post: post._id, author: req.user.id, content: req.body.content });
  res.status(201).json(await comment.populate('author','name'));
});
router.delete('/:id', authRequired, async (req, res) => {
  const c = await Comment.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  if (c.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await c.deleteOne();
  res.json({ success: true });
});
export default router;
