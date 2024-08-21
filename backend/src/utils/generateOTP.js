const user = require('../models/userSchema');


async function generateOTPForUser(number) {
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 60000); // Imposta la scadenza a 1 minuto nel futuro

    await User.updateOne(
        { number: number },
        {
            otp: otp,
            otpCreatedAt: new Date(),
            otpExpiresAt: otpExpiresAt
        }
    );
}


function generateOTP(number) {
    // Genera un OTP casuale, ad esempio, 6 cifre
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

}

module.exports = { generateOTP };
