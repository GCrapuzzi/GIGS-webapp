const config = require('../config/config')
const { Vonage } = require('@vonage/server-sdk')

console.log('API Key:', config.vonageApiKey);
console.log('API Secret:', config.vonageApiSecret);


const vonage = new Vonage({
  apiKey: "b59a5f0d",
  apiSecret: "YB3JfYpt17Y4q8HA",
})

async function sendOTP(number, otp) {
    await vonage.sms.send({
        to: number,
        from: "Gigs Web App",
        text: `Il tuo codice di verifica è: ${otp}`,
    })
    .then(resp => { console.log(resp) })
    .catch(err => { console.error(err) })
}

module.exports = sendOTP;