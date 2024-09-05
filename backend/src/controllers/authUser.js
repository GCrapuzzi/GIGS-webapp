const User = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const validateNumber = require("../validators/validateNumber");

// Funzione per autenticare l'utente
const authUser = async (req, res, next) => {
  try {

    // Estrae l'OTP e il numero di telefono dalla richiesta
    const { otp, number } = req.body;

    // Verifica che l'OTP sia presente e di 6 cifre
    if (!otp || otp.length !== 6) {
      return res.status(400).json({ message: "OTP non valido" });
    }

    // Verifica che il numero di telefono sia valido
    if (!validateNumber(number)) {
      return res.status(400).json({ message: "Numero di telefono non valido" });
    }    

    // Cerca l'utente nel database
    let user;
    try {
      user = await User.findOne({ number });
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante la ricerca dell'utente" });
    }

    // Verifica che l'utente esista
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Verifica che l'OTP corrisponda a quello salvato nel database
    if (user.otp !== otp) {
      return res.status(400).json({ message: "OTP non valido" });
    }

    // Verifica se l'OTP è scaduto
    const otpExpiresAt = new Date(user.otpExpiresAt);
    const currentTime = new Date();

    if (otpExpiresAt < currentTime) {
      return res.status(400).json({ message: "OTP scaduto" });
    }

    // Verifica se l'utente ha completato la registrazione (da completare con gli altri campi)
    let isRegistered = false;
    if (user.nome && user.cognome) {
      isRegistered = true;
    }

    try {
      // Se l'OTP è valido e non scaduto, crea il token
      const token = generateToken(user._id);

      // Imposta il cookie con il token
      res.cookie("token", token, {
        domain: 'localhost',
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,

      });

      // Risposta con messaggio di autenticazione riuscita
      return res.json({ message: 'Autenticazione riuscita', isRegistered });
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante la creazione del token o l'impostazione del cookie" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = authUser;
