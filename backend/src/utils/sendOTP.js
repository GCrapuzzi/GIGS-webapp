const config = require('../config/config')
const { Vonage } = require('@vonage/server-sdk')

console.log('API Key:', config.vonageApiKey);
console.log('API Secret:', config.vonageApiSecret);


const vonage = new Vonage({
  apiKey: config.vonageApiKey,
  apiSecret: config.vonageApiSecret,
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

sendOTP('393498124817', '1234')