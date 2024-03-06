const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookieparser') // user sends us cookie and we will trap it and verify it wheather a user is eligible to make this request or not.

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

global.onlineUsers = new Map();