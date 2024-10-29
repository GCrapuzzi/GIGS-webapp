const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware per verificare il token
const authMiddleware = (req, res) => {
  
  // Estrae il token dalla richiesta
  const token = req.cookies.token;

  // Verifica se il token è presente
  if (!token) {
    return res.status(401)
  }

  // Verifica il token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    return res.status(200)
  } catch (error) {
    return res.status(401)
  }
};

module.exports = authMiddleware;
