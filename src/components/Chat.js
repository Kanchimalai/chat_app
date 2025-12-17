
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { socket } from '../services/socket'; 

const API_URL = 'https://chat-backend-api1.onrender.com/api/messages'; 

const Chat = ({ userName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, []); 

  
  useEffect(() => {

    socket.on('receiveMessage', (message) => {
    
      setMessages(prevMessages => [...prevMessages, message]);
    });

    
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && userName) {
      const payload = {
        user: userName,
        text: input.trim(),
      };
      
      
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