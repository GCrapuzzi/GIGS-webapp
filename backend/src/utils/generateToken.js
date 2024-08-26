const config = require('../config/config');
const jwt = require("jsonwebtoken");

// Funzione per generare un token JWT
function generateToken(id){
    return jwt.sign(
        {id}, 
        config.jwtSecret, 
        {expiresIn: 3 * 24 * 60 * 60}
    );
}

module.exports = generateToken; 