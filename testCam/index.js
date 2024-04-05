const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const axios = require('axios');

// Serve your webpage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // Replace with your stream URL
  const streamUrl = 'http://192.168.1.9:8080/video';

  axios.get(streamUrl, { responseType: 'stream' })
    .then(response => {
      response.data.on('data', (chunk) => {
        // Broadcast the image to all connected clients
        socket.broadcast.emit('stream', chunk);
      });
    })
    .catch(err => console.error(err));
});

server.listen(3000);
