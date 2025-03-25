import { createContext, useState, useContext } from 'react'
import '../components/notification.css'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      
      {notification && (
        <div className={`notification ${notification.type} show`}>
          <div className="notification-content">
            {notification.message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  return useContext(NotificationContext)
} 