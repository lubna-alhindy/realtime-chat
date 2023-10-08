const io = require('socket.io-client');

const params = new URLSearchParams();
params.append('senderPhoneNumber', '0988888888');
params.append('receiverPhoneNumber', '0999999999');

const socket = io(`http://localhost:4000?${params.toString()}`);

socket.on('connect', function () {
  console.log('Connected');
  socket.emit('message', { text: '222222222222' });
});

socket.on('message', function (message) {
  console.log('Received message:', message);
  setTimeout(() => {
    socket.emit('message', { text: '222222222222' });
  }, 4000);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
