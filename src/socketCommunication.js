import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const socketHandler = {
  'playersOnline': cb => socket.on('players online', data => cb(data)),
  'updateClient': cb => socket.on('updateClient', data => cb(data)),
  'updateBoard': cb => socket.on('updateBoard', data => cb(data)),
  'finishGame': cb => socket.on('finishGame', data => cb(data)),
  'makePlayerAvailable': (data) => {
    socket.emit('makePlayerAvailable', data);
  }
}

export { socketHandler, socket };