/**
 * Validates JWT cookies and injects the user id into the request object.
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {

  // Read the token from the signed cookie.
  const token = req.cookies.token;

  // Reject unauthenticated requests.
  if (!token) {
    return res.status(401).json({ error: 'Token mancante, accesso non autorizzato' });
  }

  // Validate the JWT and forward the request when successful.
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token non valido, accesso non autorizzato' });
  }
};

module.exports = authMiddleware;
