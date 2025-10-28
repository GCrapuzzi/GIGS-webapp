/**
 * Validates an OTP login request and issues a JWT cookie when successful.
 */
const User = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const validateNumber = require("../validators/validateNumber");

const authUser = async (req, res) => {
  try {
    // Extract the OTP code and phone number from the request body.
    const { otp, number } = req.body;

    // Basic OTP validation: must exist and contain exactly 6 digits.
    if (!otp || otp.length !== 6) {
      return res.status(400).json({ message: "OTP non valido" });
    }

    // Ensure the phone number respects the expected formatting rules.
    if (!validateNumber(number)) {
      return res.status(400).json({ message: "Numero di telefono non valido" });
    }

    // Locate the user document associated with the phone number.
    let user;
    try {
      user = await User.findOne({ number });
    } catch (error) {
      return res.status(500).json({ message: "Errore durante la ricerca dell'utente" });
    }

    // Bail out when no user matches the provided number.
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Compare the supplied OTP with the persisted value.
    if (user.otp !== otp) {
      return res.status(400).json({ message: "OTP non valido" });
    }

    // Reject requests with expired OTP codes.
    const otpExpiresAt = new Date(user.otpExpiresAt);
    const currentTime = new Date();
    if (otpExpiresAt < currentTime) {
      return res.status(400).json({ message: "OTP scaduto" });
    }

    // Flag whether the user already filled in their profile data.
    let isRegistered = false;
    if (user.nome && user.cognome) {
      isRegistered = true;
    }

    try {
      // Issue a signed JWT so the client can access protected endpoints.
      const token = generateToken(user._id);

      // Persist the JWT in a secure, httpOnly cookie.
      res.cookie("token", token, {
        domain: 'gigs-webapp-frontend.vercel.app',
        expires: new Date(Date.now() + 86400000),
        httpOnly: true, // Il cookie non è accessibile da JavaScript
        secure: true // assicura che il cookie venga inviato solo tramite HTTPS
      });

      // Let the frontend know the authentication was successful.
      return res.status(200).json({ message: 'Autenticazione riuscita', isRegistered });
    } catch (error) {
      return res.status(500).json({ message: "Errore durante la creazione del token" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};

module.exports = authUser;
