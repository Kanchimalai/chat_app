// chat-frontend/src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { socket } from '../services/socket'; // Import the socket instance

const API_URL = 'https://chat-backend-api1.onrender.com/api/messages'; 

const Chat = ({ userName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scrolls to the bottom of the message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch Message History (HTTP GET)
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, []); // Run only once on mount

  // 2. Set up Socket Listeners (Persistent Connection)
  useEffect(() => {
    // Listener for real-time messages
    socket.on('receiveMessage', (message) => {
      // Optimization: Spread the new message to avoid creating a new array
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // 3. Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 4. Send Message Handler
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && userName) {
      const payload = {
        user: userName,
        text: input.trim(),
      };
      
      // Emit message over Socket.IO (Persistent Connection)
      socket.emit('sendMessage', payload); 
      
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', padding: '10px' }}>
      <h2>Real-Time Chat Demo ({userName})</h2>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #eee', marginBottom: '10px', padding: '5px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '5px', padding: '5px', background: msg.user === userName ? '#e0f7fa' : '#f0f0f0' }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '80%', padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Send</button>
      </form>
    </div>
  );
};

export default Chat;