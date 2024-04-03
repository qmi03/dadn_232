import express from 'express';
import http from 'http';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import client from './mqttserver';

dotenv.config();

const app = express()
const port = process.env.EXPRESS_PORT


app.use(express.static('public')); // serve static files from public directory


app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const server = http.createServer(app);
const io = new Server(server);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

app.get('/',(req,res) => {
    res.send('Hello Word')
})

client.on('message', (topic, payload) => {
    io.emit('temperature', payload.toString()); // emit the temperature data to the client
});

const password = process.env.MONGO_PASSWORD
const MONGO_URL = `mongodb+srv://minhpham1126:${password}@dadntest01.t4yf1fw.mongodb.net/?retryWrites=true&w=majority&appName=dadnTest01`

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) =>{console.log(error)} )