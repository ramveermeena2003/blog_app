import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api.js'
export default function PostList({ API }){
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [category, setCategory] = useState('')
  const load = async () => {
    const params = new URLSearchParams({ q, tag, category })
    const data = await apiFetch(`${API}/api/posts?`+params.toString())
    setItems(data.items); setTotal(data.total)
  }
  useEffect(() => { load() }, [])
  return <div>
    <div className='card'>
      <input placeholder='Search...' value={q} onChange={e=>setQ(e.target.value)} />
      <input placeholder='Filter tag (e.g. react)' value={tag} onChange={e=>setTag(e.target.value)} />
      <input placeholder='Category (e.g. tech)' value={category} onChange={e=>setCategory(e.target.value)} />
      <button onClick={load}>Apply</button>
    </div>
    {items.map(p => (
      <div className='card' key={p._id}>
        <h3><Link to={'/post/'+p.slug}>{p.title}</Link></h3>
        <div className='flex'>
          <span>by {p.author?.name}</span>
          {p.tags?.map(t=><span className='tag' key={t}>{t}</span>)}
        </div>
      </div>
    ))}
    {items.length===0 && <p>No posts found.</p>}
  </div>
}
