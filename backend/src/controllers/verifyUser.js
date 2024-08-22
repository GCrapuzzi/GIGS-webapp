const validateNumber = require("../validators/validateNumber");
const generateOTP = require("../utils/generateOTP");
const User = require("../models/userSchema");
const sendOTP = require("../utils/sendOTP");

const verifyUser = async (req, res, next) => {
    try {
      // Verifica che il numero sia presente nella richiesta
      const number = req.body.number;
      if (!number) {
        return res.status(400).json({ message: "Il numero è obbligatorio" });
      }
  
      // Verifica se il numero è valido
      if (!validateNumber(number)) {
        return res.status(400).json({ message: "Numero non valido" });
      }
  
      let user;
      try {
        // Cerca l'utente con il numero specificato
        user = await User.findOne({ number });
      } catch (error) {
        return next({ statusCode: 500, message: "Errore durante la ricerca dell'utente" });
      }
  
      // Genera un OTP e la data di scadenza
      const { otp, otpExpiresAt } = generateOTP();
  
      if (user) {
        // Se l'utente esiste, aggiorna il campo otp
        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
      } else {
        // Se l'utente non esiste, crea un nuovo utente
        user = new User({ number, otp, otpExpiresAt });
      }
  
      try {
        await user.save();
      } catch (error) {
        return next({ statusCode: 500, message: "Errore durante il salvataggio dell'utente" });
      }
  
      try {
        // Invia OTP all'utente
        await sendOTP(number, otp);
      } catch (error) {
        return next({ statusCode: 500, message: "Errore durante l'invio dell'OTP" });
      }
  
      // Invia una risposta di successo
      return res.status(200).json({ message: "OTP inviato con successo" });
  
    } catch (error) {
      return next(error);
    }
  };
  
module.exports = verifyUser;