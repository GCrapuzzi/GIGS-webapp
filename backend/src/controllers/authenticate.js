const User = require("../models/userSchema");
const Annuncio = require("../models/annuncioSchema");
const generateToken = require("../utils/generateToken");

// Funzione per autenticare l'utente
const authenticate = async (req, res, next) => {
  try {
    const { otp, number } = req.body;

    // Verifica che l'OTP sia presente
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Verifica che il numero di telefono sia presente
    let user;
    try {
      user = await User.findOne({ number });
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante la ricerca dell'utente" });
    }

    // Verifica che l'utente esista e che l'OTP sia corretto
    if (!user) {
      return res.status(404).json({ message: "User not found"+number });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Verifica se l'OTP è scaduto
    const otpExpiresAt = new Date(user.otpExpiresAt);
    const currentTime = new Date();

    if (otpExpiresAt < currentTime) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Verifica se l'utente ha già creato un annuncio
    let annuncio;
    try {
      annuncio = await Annuncio.findOne({ user_id: user._id });
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante la ricerca dell'annuncio" });
    }

    try {
      // Se l'OTP è valido e non scaduto, crea il token
      const token = generateToken(user._id);

      // Imposta il cookie con il token
      res.cookie("token", token, {
        domain: "localhost",
        path: "/",
        expires: new Date(Date.now() + 86400000),
        secure: true,
        httpOnly: true,
        sameSite: 'None', 
      });

      // Risposta con il token
      return res.json({ message: 'Autenticazione riuscita', token });
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante la creazione del token o l'impostazione del cookie" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = authenticate;
