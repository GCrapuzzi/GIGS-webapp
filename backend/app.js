const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./src/config/database');
const config = require('./src/config/config');
const path = require('path');

// Importo le route
const userRoutes = require('./src/routes/userRoutes');
const annunciRoutes = require('./src/routes/annunciRoutes');

// Inizializzo l'applicazione
const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  'https://gigs-webapp-frontend.vercel.app',
];

if (config.frontendURL && !allowedOrigins.includes(config.frontendURL)) {
  allowedOrigins.push(config.frontendURL);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

// Servi la cartella "uploads" come file statici
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

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
