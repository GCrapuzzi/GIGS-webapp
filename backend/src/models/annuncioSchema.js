const mongoose=require("mongoose");

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      number: String,
      città: String,
      lavoretto: String,
      tariffa: String,
      descrizione: String,
      orario: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

// Modello per gli annunci
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;