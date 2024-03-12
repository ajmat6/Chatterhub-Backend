const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookieparser') // user sends us cookie and we will trap it and verify it wheather a user is eligible to make this request or not.
const { Server } = require('socket.io')
const http = require('http');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Database connected")
})

// routes imports:
const authRoutes = require('./routes/authRouter');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());
app.use(cors());

// routes use:
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes)

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
// })


// create server using http module of nodejs:
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log(`Server chal raha on port ${process.env.PORT}`);
})

const io = new Server(server, {
    cors: {
        origin: 'https://localhost:5000'
    }
})

// global is a global object:
global.onlineUsers = new Map(); // creating a map for online users that will contain userId as the key and socketId as value (socketIo gives a socket connection id whenever a new user making web socket connection)
io.on('connection', (socket) => { // socket is a user that will contain info passed from frontend
    console.log("new user connected")
    global.chatSocket = socket; 
    socket.on('add-user', (userId) => { // add user is a action that socket will take into consideration. There can be many connection
        onlineUsers.set(userId, socket.id); // adding new user into map
        console.log('new user added with id ', userId)
    })
})