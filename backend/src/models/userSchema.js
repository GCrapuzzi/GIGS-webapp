/**
 * Mongoose model describing the fields stored for each user.
 */
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
      nome:String,
      cognome:String,
      number:String,
      profileImageUrl: String,
      biografia: String,
      otp: String,
      otpExpiresAt: Date
})

// Export the compiled model so controllers can query/update users.
const user=mongoose.model("user", userSchema);

module.exports = user;