// chat-frontend/src/services/socket.js
import { io } from 'socket.io-client';

// The server's URL. Use the PORT defined in your backend .env
const SOCKET_SERVER_URL = "https://chat-backend-api1.onrender.com"; 

export const socket = io(SOCKET_SERVER_URL, {
  // Optimization: Disable transport fallbacks if you only want to use WebSockets
  // transports: ['websocket'] 
});