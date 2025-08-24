import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiFetch } from '../api.js'
import { AuthContext } from '../App.jsx'
export default function PostView({ API }){
  const { slug } = useParams()
  const { token } = useContext(AuthContext)
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [err, setErr] = useState('')
  const load = async () => {
    const p = await apiFetch(`${API}/api/posts/slug/${slug}`)
    setPost(p)
    const c = await apiFetch(`${API}/api/comments/${p._id}`)
    setComments(c)
  }
  useEffect(()=>{ load() }, [slug])
  const toggleLike = async () => {
    try {
      await apiFetch(`${API}/api/posts/${post._id}/like`, { method:'POST' }, token)
      await load()
    } catch(e){ setErr(e.message) }
  }
  const addComment = async (e) => {
    e.preventDefault()
    try {
      await apiFetch(`${API}/api/comments/${post._id}`, { method:'POST', body: JSON.stringify({ content }) }, token)
      setContent(''); await load()
    } catch(e){ setErr(e.message) }
  }
  if (!post) return <p>Loading...</p>
  return <div>
    <div className='card'>
      <h2>{post.title}</h2>
      <div className='flex'>
        <span>by {post.author?.name}</span>
        {post.tags?.map(t=><span className='tag' key={t}>{t}</span>)}
      </div>
      <div style={{marginTop:10}} dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className='flex' style={{marginTop:10}}>
        <button onClick={toggleLike}>Toggle Like</button>
      </div>
      {err && <p style={{color:'salmon'}}>{err}</p>}
    </div>
    <div className='card'>
      <h3>Comments</h3>
      {comments.map(c => (
        <div key={c._id} style={{borderTop:'1px solid #243248', paddingTop:8, marginTop:8}}>
          <div className='flex'><strong>{c.author?.name}</strong><span style={{opacity:.7}}>{new Date(c.createdAt).toLocaleString()}</span></div>
          <div>{c.content}</div>
        </div>
      ))}
      {comments.length===0 && <p>No comments yet.</p>}
      <form onSubmit={addComment} style={{marginTop:10}}>
        <input placeholder='Write a comment...' value={content} onChange={e=>setContent(e.target.value)} />
        <button>Add Comment</button>
      </form>
    </div>
  </div>
}
