import React, { useEffect, useState } from 'react';
import gun from './Gun';
import { clearDatabase } from './ClearDataBase';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Subscribe to GunDB 'messages' node
    const messagesNode = gun.get('messages');
    
    // Create a unique message store to avoid duplicates
    const uniqueMessages = {};

    messagesNode.map().on((msg, key) => {
      if (msg) { // Ensure the message is not null
        // Check if the message is already added
        if (!uniqueMessages[key]) {
          uniqueMessages[key] = msg;
          setMessages((prevMessages) => [...prevMessages, { ...msg, key }]);
        }
      }
    });

    // Clean up subscription on component unmount
    return () => messagesNode.off();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Add message to GunDB
      gun.get('messages').set({ text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>GunDB with React</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.key}>{msg.text}</li>
        ))}
      </ul>
      <button onClick={()=>{
        clearDatabase()
        setMessages([]);
      }}>Clear Database</button>
    </div>
  );
}

export default App;
