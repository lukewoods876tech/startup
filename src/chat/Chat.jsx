import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useAuth } from '../context/AuthContext';
import './chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, connected } = useWebSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && connected) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <main className="chat-container">
      <h1>Zoo Chat</h1>
      <p className="connection-status">
        Status: {connected ? 'Connected' : 'Disconnected'}
      </p>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Be the first to say hello!</p>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.type === 'system' ? 'system-message' : 
                           msg.username === user?.username ? 'my-message' : 'other-message'}`}
            >
              {msg.type === 'system' ? (
                <div className="system-content">{msg.message}</div>
              ) : (
                <>
                  <div className="message-header">
                    <span className="username">{msg.username}</span>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="message-content">{msg.message}</div>
                </>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!connected}
        />
        <button type="submit" disabled={!connected || !message.trim()}>
          Send
        </button>
      </form>
    </main>
  );
}

export default Chat; 