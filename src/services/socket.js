// chat-frontend/src/services/socket.js
import { io } from 'socket.io-client';

// The server's URL. Use the PORT defined in your backend .env
const SOCKET_SERVER_URL = "http://localhost:5000"; 

export const socket = io(SOCKET_SERVER_URL, {
  // Optimization: Disable transport fallbacks if you only want to use WebSockets
  // transports: ['websocket'] 
});