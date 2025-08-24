import express from 'express';
import slugify from 'slugify';
import Post from '../models/Post.js';
import { authRequired } from '../middleware/auth.js';
const router = express.Router();
router.post('/', authRequired, async (req, res) => {
  try {
    const { title, content, tags = [], category = '', imageUrl = '' } = req.body;
    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
    const post = await Post.create({ title, slug, content, tags, category, imageUrl, author: req.user.id });
    res.status(201).json(post);
  } catch (e) { res.status(500).json({ error: e.message }); }
});
router.get('/', async (req, res) => {
  const { q = '', tag, category, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (tag) filter.tags = tag;
  if (category) filter.category = category;
  const docs = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page)-1) * Number(limit))
    .limit(Number(limit))
    .populate('author', 'name');
  const count = await Post.countDocuments(filter);
  res.json({ items: docs, total: count });
});
router.get('/slug/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});
router.put('/:id', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden' });
  const { title, content, tags, category, imageUrl, published } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (tags) post.tags = tags;
  if (category) post.category = category;
  if (imageUrl !== undefined) post.imageUrl = imageUrl;
  if (published !== undefined) post.published = published;
  await post.save();
  res.json(post);
});
router.delete('/:id', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden' });
  await post.deleteOne();
  res.json({ success: true });
});
router.post('/:id/like', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  const idx = post.likes.findIndex(u => u.toString() === req.user.id);
  if (idx >= 0) post.likes.splice(idx, 1);
  else post.likes.push(req.user.id);
  await post.save();
  res.json({ likesCount: post.likes.length, liked: idx < 0 });
});
export default router;
