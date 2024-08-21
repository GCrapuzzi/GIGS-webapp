const user = require('../models/userSchema');

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 60000); // Imposta la scadenza a 1 minuto nel futuro
    return { otp, otpExpiresAt };
}

module.exports = { generateOTP };
