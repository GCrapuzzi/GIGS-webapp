/**
 * Creates or updates a user record and dispatches an OTP to their phone number.
 */
const validateNumber = require("../validators/validateNumber");
const generateOTP = require("../utils/generateOTP");
const User = require("../models/userSchema");
const sendOTP = require("../utils/sendOTP");

const signupUser = async (req, res) => {

  try {
    // Ensure the request contains a phone number.
    const number = req.body.number;
    if (!number) {
      return res.status(400).json({ message: "Il numero è obbligatorio" });
    }

    // Reject malformed phone numbers early.
    if (!validateNumber(number)) {
      return res.status(400).json({ message: "Numero non valido" });
    }

    // Determine whether the user already exists.
    let user;
    try {
      user = await User.findOne({ number });
    } catch (error) {
      return res.status(500).json({ message: "Errore interno del server" });
    }

    // Generate a fresh OTP and expiration timestamp.
    const {otp, otpExpiresAt} = generateOTP();

    if (user) {
      // Update the existing user document in place.
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
    } else {
      // Create a minimal user document that will be completed after authentication.
      user = new User({ number, otp, otpExpiresAt });
    }

    // Persist OTP changes before sending the SMS.
    try {
      await user.save();
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante il salvataggio dell'utente" });
    }

    // Dispatch the OTP via SMS.
    try {
      await sendOTP(number, otp);
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante l'invio dell'OTP" });
    }

    // Notify the client that the OTP was issued.
    return res.status(200).json({ message: "OTP inviato con successo" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
  
module.exports = signupUser;