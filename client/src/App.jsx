import React, { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import PostList from './components/PostList.jsx'
import PostEditor from './components/PostEditor.jsx'
import PostView from './components/PostView.jsx'
import Profile from './components/Profile.jsx'
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export const AuthContext = React.createContext(null)
export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(token ? JSON.parse(localStorage.getItem('user')) : null)
  const navigate = useNavigate()
  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem('token'); localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <nav className='container'>
        <Link to='/'>Blog</Link>
        <Link to='/new'>Write</Link>
        <div style={{marginLeft:'auto'}}/>
        {!user ? (<>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>) : (<>
          <span>Hi, {user.name}</span>
          <Link to='/me'>Profile</Link>
          <button onClick={logout}>Logout</button>
        </>)}
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<PostList API={API}/>}/>
          <Route path='/login' element={<Login API={API}/>}/>
          <Route path='/register' element={<Register API={API}/>}/>
          <Route path='/new' element={<PostEditor API={API}/>}/>
          <Route path='/post/:slug' element={<PostView API={API}/>}/>
          <Route path='/me' element={<Profile API={API}/>}/>
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}
