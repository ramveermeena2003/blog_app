import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App.jsx'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api.js'
export default function Profile({ API }){
  const { token } = useContext(AuthContext)
  const [me, setMe] = useState(null)
  useEffect(() => {
    const load = async () => {
      const data = await apiFetch(`${API}/api/users/me`, {}, token)
      setMe(data)
    }
    load()
  }, [token])
  if (!token) return <p>Please log in.</p>
  if (!me) return <p>Loading...</p>
  return <div className='card'>
    <h2>{me.user.name}</h2>
    <p>{me.user.email}</p>
    <h3>Your Posts</h3>
    {me.posts.map(p => (
      <div key={p._id}>
        <Link to={'/post/'+p.slug}>{p.title}</Link>
      </div>
    ))}
    {me.posts.length===0 && <p>No posts yet.</p>}
  </div>
}
