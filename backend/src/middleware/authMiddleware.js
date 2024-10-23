const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware per verificare il token
const authMiddleware = (req, res, next) => {

  // Estrae il token dalla richiesta
  const token = req.cookies.token;

  // Verifica se il token è presente
  if (!token) {
    return res.status(401).send({ error: 'Accesso negato' });
  }

  // Verifica il token (Verificare che venga controllata la scadenza del token) 
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    //if (decoded.expiresIn < Date.now()) {
      //return res.status(401).send({ error: 'Token scaduto' });
    //}
    next();
  } catch (err) {
    res.status(400).send({ error: 'Token non valido' });
  }
};

module.exports = authMiddleware;
