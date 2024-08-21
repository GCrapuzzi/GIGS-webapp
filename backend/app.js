const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Importo le route
const userRoutes = require('./src/routes/userRoutes');
const annunciRoutes = require('./src/routes/annunciRoutes');

// Inizializzo l'applicazione
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(errorHandler);

// Connessione al database
connectToDatabase();

// Route principale
app.get('/', (req, res) => {
  res.send('API in funzione...');
});
// Route per gli utenti
app.use('/users', userRoutes);
// Route per gli annunci
app.use('/annunci', annunciRoutes);

module.exports = app;
