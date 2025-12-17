
import React, { useState } from 'react';
import Chat from './components/Chat';

function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', maxWidth: '300px', margin: '50px auto' }}>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '10px' }}>Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <Chat userName={userName} />
    </div>
  );
}

export default App;