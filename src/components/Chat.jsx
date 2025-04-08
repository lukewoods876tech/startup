import { useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useAuth } from '../context/AuthContext';
import './Chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, connected } = useWebSocket();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && connected) {
      sendMessage(message);
      setMessage('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <div className={`chat-container ${isOpen ? 'open' : 'closed'}`}>
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Zoo Chat</h3>
            <span className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          <div className="messages-container">
            {messages.length === 0 ? (
              <p className="no-messages">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.username === user.username ? 'own-message' : 'other-message'}`}
                >
                  <span className="message-username">{msg.username}</span>
                  <p className="message-content">{msg.message}</p>
                  <span className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
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
        </div>
      )}
    </div>
  );
}

export default Chat; 