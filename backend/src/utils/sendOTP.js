const twilio = require("twilio");
const config = require('./src/config/config');
const client = twilio(config.accountSid, config.authToken);


async function sendOTP(number, otp) {
  const message = await client.messages.create({
    body: "Your OTP is: " + otp,
    from: config.twilioNumber,
    to: number,
  });

  console.log(message.body);
}

module.exports = sendOTP;