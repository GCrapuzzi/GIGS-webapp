// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connessione al database (questa andrebbe spostata in controller, fallo quando vuoi paul)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Route principale
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route per gli utenti
app.use('/users', userRoutes);

module.exports = app;