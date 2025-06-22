
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();
const db = mongoose.connection

app.use(express.json())

app.use(cors({
  origin: ['https://todolist.it.com'], // allow requests from  CloudFront domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const todoRouter = require('./routes/todo')
app.use('/todo', todoRouter)

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to Database');

    app.listen(3000, '0.0.0.0', () => console.log('Server Started'));
  } catch (error) {
    console.error('Failed to connect to Database', error);
  }
}

startServer();
