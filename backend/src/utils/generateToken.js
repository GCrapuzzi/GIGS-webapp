/**
 * Signs a JWT containing the user id with the configured secret.
 */
const config = require('../config/config');
const jwt = require("jsonwebtoken");

function generateToken(id){
    return jwt.sign(
        {id: id}, // Payload
        config.jwtSecret,
        {expiresIn: 6 * 60 * 60}
    );
}

module.exports = generateToken;