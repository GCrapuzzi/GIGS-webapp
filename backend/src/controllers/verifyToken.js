const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res) => {
    token = req.cookies.token
    console.log(token)
    if (!token) {
        return res.status(403).json({ isAuthenticated: false, message: 'Token mancante. Accesso negato.' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isAuthenticated: false, message: 'Token non valido.' });
        }

        req.user = decoded; // Salva i dati dell'utente decodificati nell'oggetto req.user

        // Risposta con isAuthenticated = true
        res.json({ isAuthenticated: true, message: `Benvenuto, ${req.user.username}!`, user: req.user });
    });
};

module.exports = verifyToken;


