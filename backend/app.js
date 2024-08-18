// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

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

// Routes (questa potrebbe andare in routes ma essendo la route principale la lascerei qua, a te la scelta)
app.get('/', (req, res) => {
  res.send('Paul is running...');
});

module.exports = app;
