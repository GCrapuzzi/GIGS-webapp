/**
 * Express application bootstrapper.
 * Wires together security middleware, static assets, database connectivity,
 * and the REST routes exposed by the backend.
 */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./src/config/database');
const config = require('./src/config/config');
const path = require('path');

// Register feature-specific routers.
const userRoutes = require('./src/routes/userRoutes');
const annunciRoutes = require('./src/routes/annunciRoutes');

// Initialize the Express instance once and share it with the HTTP server.
const app = express();

// Core middleware stack for JSON parsing, CORS, and cookie parsing.
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

// Expose uploaded profile pictures as static assets.
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Connect to MongoDB before handling any requests.
connectToDatabase();

// Basic health-check endpoint for uptime probes.
app.get('/', (req, res) => {
  res.send('API in funzione...');
});

// Mount user-related endpoints.
app.use('/users', userRoutes);

// Mount gig listing endpoints.
app.use('/annunci', annunciRoutes);

module.exports = app;
