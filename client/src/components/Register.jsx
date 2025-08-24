import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api.js'
import { AuthContext } from '../App.jsx'
export default function Register({ API }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()
  const { setToken, setUser } = useContext(AuthContext)
  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await apiFetch(`${API}/api/auth/register`, { method:'POST', body: JSON.stringify({ name, email, password }) })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setToken(data.token); setUser(data.user)
      nav('/')
    } catch (e){ setErr(e.message) }
  }
  return <div className='card'>
    <h2>Register</h2>
    <form onSubmit={submit}>
      <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
      {err && <p style={{color:'salmon'}}>{err}</p>}
      <button>Create account</button>
    </form>
  </div>
}
