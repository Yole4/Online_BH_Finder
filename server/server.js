const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');
const db = require('./controllers/database');
const userRoute = require('./routes/userRoutes');
const chatRoute = require('./routes/chatRoutes');
const messageRoute = require('./routes/messagesRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
  res.send("Welcome to chat system backend!");
});

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});