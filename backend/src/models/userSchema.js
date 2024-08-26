const mongoose=require("mongoose");

// Schema per l'utente
const userSchema=mongoose.Schema({
      nome:String,
      cognome:String,
      number:String,
      profileImageUrl: String,
      description: String,
      otp: String,
      otpExpiresAt: Date,
      biography: String 
})

// Modello per l'utente
const user=mongoose.model("user", userSchema);

module.exports = user;