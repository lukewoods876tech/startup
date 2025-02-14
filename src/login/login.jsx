import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)
      navigate('/manage')
      window.location.reload()
    }
  }

  return (
    <main>
      <div className="login-header">
        <h2>Login to MyZoo</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default Login 