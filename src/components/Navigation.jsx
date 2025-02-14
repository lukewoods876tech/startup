import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './navigation.css'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const storedUsername = localStorage.getItem('username')
    setIsLoggedIn(loggedIn)
    setUsername(storedUsername)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
    window.location.href = '/'  // Use direct navigation for logout
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
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation 