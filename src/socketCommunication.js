import io from 'socket.io-client';
const socket = io('http://127.0.0.1:3001/');

const socketHandler = {
  'playersOnline': cb => socket.on('players online', data => cb(data)),
  'updateClient': cb => socket.on('updateClient', data => cb(data)),
  'updateBoard': cb => socket.on('updateBoard', data => cb(data)),
  'finishGame': cb => socket.on('finishGame', data => cb(data)),
  'makePlayerAvailable': (data) => {
    socket.emit('makePlayerAvailable', data);
  },
  'keyPressed': (data) => {
    socket.emit('keyPressed', data);
  }
}

export { socketHandler, socket };