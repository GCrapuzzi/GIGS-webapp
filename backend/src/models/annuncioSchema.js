/**
 * Mongoose model representing a gig listing posted by a user.
 */
const mongoose=require("mongoose");
const User = require('./userSchema');

const annuncioSchema=mongoose.Schema({
      titolo: String,
      città: String,
      lavoro: String,
      tariffa: Number, 
      descrizione: String,
      orario: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

// Export the compiled model that points to the "Annunci" collection.
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;