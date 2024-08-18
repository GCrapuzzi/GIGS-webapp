// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Blueprint routes
const userRoutes = require('./src/routes/userRoutes');

// Middleware (questa andrebbe in middleware, fallo quando vuoi paul)
app.use(express.json()); // Per il parsing del corpo delle richieste in formato JSON
app.use(cors()); // Per consentire le richieste da qualsiasi origine

// Connessione al database (questa andrebbe spostata in controller, fallo quando vuoi paul)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Route principale
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route per gli utenti
app.use('/users', userRoutes);

module.exports = app;
