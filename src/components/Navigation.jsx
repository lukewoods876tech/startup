import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './navigation.css'

function Navigation() {
  const { user, logout } = useAuth()
  
  // Determine if user is logged in based on user object from context
  const isLoggedIn = !!user
  
  console.log('Navigation render - isLoggedIn:', isLoggedIn, 'user:', user)

  return (
    <header>
      <h1>Welcome to MyZoo!</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/manage">Manage Zoo</Link></li>
              <li><Link to="/animals">View Animals</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><button onClick={logout}>Logout</button></li>
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
  );
}

export default Navigation;