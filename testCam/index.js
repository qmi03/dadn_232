// Server side (Node.js + Express + Socket.io + OpenCV)
const cv = require('opencv4nodejs');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const FPS = 10;
const wCap = new cv.VideoCapture('http://your_ip_webcam_stream_link');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image);
}, 1000 / FPS);

server.listen(3000, () => {
    console.log('listening on *:3000');
});
