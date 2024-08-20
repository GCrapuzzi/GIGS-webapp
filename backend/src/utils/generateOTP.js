async function generateOTPForUser(number) {
    const otp = generateOTP(); // Funzione per generare l'OTP
    await User.updateOne(
        { number: number },
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

module.export = { generateOTPforUser };