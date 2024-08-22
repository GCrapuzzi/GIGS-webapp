const User = require("../models/userSchema");
const { createSecretToken } = require("../utils/generateToken");

const login = async (req, res) => {
  const { number, otp } = req.body;

  // Verifica che il numero di telefono e l'OTP siano presenti
  if (!(number && otp)) {
    return res.status(400).json({ message: "All input is required" });
  }

  // Cerca l'utente con il numero di telefono specificato
  const user = await User.findOne({ number });

  // Verifica che l'utente esista e che l'OTP sia corretto
  if (!(user && otp === user.otp)) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  

  // Verifica se l'OTP è scaduto
  const otpExpiresAt = new Date(user.otpExpiresAt);
  const currentTime = new Date();

  if (otpExpiresAt < currentTime) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  // Se l'OTP è valido e non scaduto, crea il token
  const token = createSecretToken(user._id);

  // Imposta il cookie con il token
  res.cookie("token", token, {
    domain: process.env.frontend_url, // Set your domain here
    path: "/", // Cookie is accessibile da tutti i percorsi
    expires: new Date(Date.now() + 86400000), // Il cookie scade in 1 giorno
    secure: true, // Il cookie sarà inviato solo tramite HTTPS
    httpOnly: true, // Il cookie non può essere accessibile tramite script client-side
    sameSite: "None",
  });

  // Risposta con il token
  res.json({ token });
};

module.exports = login;
