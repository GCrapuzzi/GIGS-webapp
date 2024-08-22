const vonage = require('../config/vonage')

// Funzione per inviare un messaggio di testo con il codice OTP
async function sendOTP(number, otp) {
    await vonage.sms.send({
        to: number,
        from: "Gigs Web App",
        text: `Il tuo codice di verifica è: ${otp}.`,
    })
    .then(resp => { console.log(resp) })
    .catch(err => { console.error(err) })
}

module.exports = sendOTP;