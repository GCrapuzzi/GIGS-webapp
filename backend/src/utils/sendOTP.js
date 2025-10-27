/**
 * Sends the generated OTP to the user's phone number via Vonage.
 */
const vonage = require('../config/vonage')

async function sendOTP(number, otp) {
    try {
      await vonage.sms.send({
        to: number,
        from: 'Gigs Web App',
        text: `Il tuo codice di verifica è: ${otp}.`
      });
    } catch (error) {
      console.error("Errore durante l'invio dell'OTP:", error);
      throw new Error("Impossibile inviare OTP");
    }
  }
  
module.exports = sendOTP;