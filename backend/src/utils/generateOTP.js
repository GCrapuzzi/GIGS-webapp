/**
 * Generates a six-digit OTP and a one-minute expiration timestamp.
 */
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 60000);
    return { otp, otpExpiresAt };
}

module.exports = generateOTP;