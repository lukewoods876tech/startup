import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './navigation.css'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  // This function will check the login state
  const checkLoginState = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const storedUsername = localStorage.getItem('username')
    setIsLoggedIn(loggedIn)
    setUsername(storedUsername || '')
  }

  // Check login state when component mounts
  useEffect(() => {
    checkLoginState()
    
    // Add event listener for storage changes
    window.addEventListener('storage', checkLoginState)
    
    // Add custom event listener for login state changes
    window.addEventListener('loginStateChanged', checkLoginState)
    
    return () => {
      window.removeEventListener('storage', checkLoginState)
      window.removeEventListener('loginStateChanged', checkLoginState)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('loginStateChanged'))
    
    navigate('/')
  }

  return (
    <header>
      <h1>{username ? `Welcome to MyZoo, ${username}!` : 'Welcome to MyZoo!'}</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/manage">Manage Zoo</Link></li>
              <li><Link to="/animals">View Animals</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/auth">Login / Register</Link></li>
              <li><Link to="/about">About</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation 