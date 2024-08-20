const mongoose=require("mongoose");

// Schema per l'utente
const userSchema=mongoose.Schema({
      nome:String,
      cognome:String,
      number:String,
      otp: String,
      otpCreatedAt: {
            type: Date,
            expires: "5s"
      }
})

// Creo il modello
const user=mongoose.model("user", userSchema);

module.exports=user;