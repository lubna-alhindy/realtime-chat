const io = require('socket.io-client');

const params = new URLSearchParams();
params.append('senderPhoneNumber', '0999999999');
params.append('receiverPhoneNumber', '0988888888');

const socket = io(`http://localhost:4000?${params.toString()}`);

socket.on('connect', function () {
  console.log('Connected');
  socket.emit('message', { text: '111111111111' });
});

socket.on('message', function (message) {
  console.log('Received message:', message);
  setTimeout(() => {
    socket.emit('message', { text: '111111111111' });
  }, 1000);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});

setTimeout(() => {
  socket.close();
}, 10000);
