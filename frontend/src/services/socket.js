import { io } from 'socket.io-client';

let socket;
export function initSocket() {
  const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
  socket = io(url, { autoConnect: true });
  return socket;
}
