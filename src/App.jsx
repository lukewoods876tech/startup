import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './home/Home'
import Manage from './manage/Manage'
import Animals from './animals/Animals'
import About from './about/About'
import Auth from './auth/Auth'
import Chat from './components/Chat'
import { ZooProvider } from './context/ZooContext'
import { NotificationProvider } from './context/NotificationContext'
import { AuthProvider } from './context/AuthContext'
import { WebSocketProvider } from './context/WebSocketContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './login/Login'
import Register from './register/Register'

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <ZooProvider>
          <NotificationProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/animals" 
                element={
                  <ProtectedRoute>
                    <Animals />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/manage" 
                element={
                  <ProtectedRoute>
                    <Manage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/register" element={<Navigate to="/auth" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Chat />
            <Footer />
          </NotificationProvider>
        </ZooProvider>
      </WebSocketProvider>
    </AuthProvider>
  )
}

export default App 