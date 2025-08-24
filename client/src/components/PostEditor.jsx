import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { apiFetch } from '../api.js'
import { AuthContext } from '../App.jsx'
export default function PostEditor({ API }){
  const { token } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('react,js')
  const [category, setCategory] = useState('tech')
  const [err, setErr] = useState('')
  const nav = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    if (!token) return setErr('Login first')
    try {
      const payload = { title, content, tags: tags.split(',').map(s=>s.trim()).filter(Boolean), category }
      const data = await apiFetch(`${API}/api/posts`, { method:'POST', body: JSON.stringify(payload) }, token)
      nav('/post/'+data.slug)
    } catch (e){ setErr(e.message) }
  }
  return <div className='card'>
    <h2>Write a post</h2>
    <form onSubmit={submit}>
      <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
      <ReactQuill theme='snow' value={content} onChange={setContent} />
      <input placeholder='tags (comma separated)' value={tags} onChange={e=>setTags(e.target.value)} />
      <input placeholder='category' value={category} onChange={e=>setCategory(e.target.value)} />
      {err && <p style={{color:'salmon'}}>{err}</p>}
      <button>Publish</button>
    </form>
  </div>
}
