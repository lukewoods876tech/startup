import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('loginStateChanged'));
      
      navigate('/manage');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <div className="register-header">
        <h2>Register for MyZoo</h2>
      </div>
      {error && <div className="error-message">{error}</div>}
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
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register; 