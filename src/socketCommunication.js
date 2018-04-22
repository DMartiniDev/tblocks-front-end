import io from 'socket.io-client';
const socket = io('http://192.168.1.40:3001');

const socketHandler = {
  'playersOnline': cb => socket.on('players online', data => cb(data))
}

export { socketHandler, socket };