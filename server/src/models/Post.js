import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, index: true }],
  category: { type: String, index: true },
  imageUrl: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  published: { type: Boolean, default: true }
}, { timestamps: true });
postSchema.index({ title: 'text', content: 'text' });
export default mongoose.model('Post', postSchema);
