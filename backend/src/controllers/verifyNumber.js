const User = require("../models/userSchema");
const { validateNumber } = require("../validators/validateNumber");
const {generateOTP} = require("../utils/generateOTP");

const verifyNumber = async (req, res) => {
    const { number } = req.body;

    // Verifica se il numero è valido
    if (!validateNumber(number)) {
        return res.status(400).json({ message: "Numero non valido" });
    }

    // Cerca l'utente con il numero specificato
    let user = await User.findOne({ number });

    // Genera un OTP
    const otp = generateOTP();

    if (user) {
        // Se l'utente esiste, aggiorna il campo otp
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 60000);
        await user.save();
    } else {
        // Se l'utente non esiste, crea un nuovo utente
        user = new User({ number, otp, otpExpiresAt});
        await user.save();
    }

    const isOTPvalid = true;
    const isOtpExpired = user.otpExpiresAt < new Date();

    if (!isOtpValid) {
        throw new Error('OTP non valido');
    }

    if (isOtpExpired) {
        throw new Error('OTP scaduto');
    }

    return res.status(200).json({ message: "OTP generato con successo", otp });

   
}

module.exports = verifyNumber;