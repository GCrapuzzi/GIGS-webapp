async function generateOTPForUser(userId) {
    const otp = generateOTP(); // Funzione per generare l'OTP
    await User.updateOne(
        { _id: userId },
        {
            otp: otp,
            otpCreatedAt: new Date() // Imposta l'ora corrente
        }
    );
}

function generateOTP() {
    // Genera un OTP casuale, ad esempio, 6 cifre
    return Math.floor(100000 + Math.random() * 900000).toString();
}