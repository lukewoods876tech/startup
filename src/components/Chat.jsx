import React, { useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function Chat() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const socket = useWebSocket();

  const sendMessage = () => {
    if (socket && name && message) {
      socket.send(JSON.stringify({ name, message }));
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat; 