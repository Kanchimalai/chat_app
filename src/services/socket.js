
import { io } from 'socket.io-client';


const SOCKET_SERVER_URL = "https://chat-backend-api1.onrender.com"; 

export const socket = io(SOCKET_SERVER_URL, {
  
});