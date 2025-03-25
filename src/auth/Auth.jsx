import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'

function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', username)
        localStorage.setItem('isLoggedIn', 'true')
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('loginStateChanged'))
        
        navigate('/animals')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', username)
      localStorage.setItem('isLoggedIn', 'true')
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('loginStateChanged'))
      
      navigate('/manage')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <main>
      <div className="auth-header">
        <h2>Welcome to MyZoo</h2>
        <p>Login or create a new account to get started</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="auth-form">
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
        
        <div className="auth-buttons">
          <button 
            type="button" 
            className="register-button" 
            onClick={handleRegister}
          >
            Register
          </button>
          
          <button 
            type="button" 
            className="login-button" 
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  )
}

export default Auth 