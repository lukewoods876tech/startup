import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { login, register, user } = useAuth()
  const navigate = useNavigate()
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User is already logged in, redirecting to animals page')
      navigate('/animals')
    }
  }, [user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    performAuth('login')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    performAuth('register')
  }

  const performAuth = async (action) => {
    if (!username || !password) {
      setError('Username and password are required')
      return
    }

    setError('')
    setMessage('')
    setLoading(true)
    
    try {
      console.log(`Attempting to ${action} with username: ${username}`)
      let result
      
      if (action === 'login') {
        setMessage('Logging in...')
        result = await login(username, password)
      } else {
        setMessage('Creating your account...')
        result = await register(username, password)
      }
      
      console.log('Auth result:', result)
      
      if (!result.success) {
        setError(result.message || `${action === 'login' ? 'Login' : 'Registration'} failed`)
        setMessage('')
      } else {
        if (action === 'login') {
          setMessage('Login successful! Redirecting to your animals...')
          setTimeout(() => {
            navigate('/animals')
          }, 1000)
        } else {
          setMessage('Registration successful! Redirecting to manage your zoo...')
          setTimeout(() => {
            navigate('/manage')
          }, 1000)
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(`An error occurred during ${action}`)
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Welcome to MyZoo</h2>
        <p>Login or create a new account to manage your zoo</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      <form className="auth-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className="auth-buttons">
          <button 
            type="button" 
            onClick={handleLogin} 
            disabled={loading}
            className="login-button"
          >
            {loading && message === 'Logging in...' ? 'Logging in...' : 'Login'}
          </button>
          
          <button 
            type="button" 
            onClick={handleRegister} 
            disabled={loading}
            className="register-button"
          >
            {loading && message === 'Creating your account...' ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Auth 