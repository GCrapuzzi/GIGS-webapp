const mongoose=require("mongoose");

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      number: String,
      città: String,
      lavoretto: String,
      tariffa: String,
      descrizione: String,
      orario: String,
      user_id: String
})

// Modello per gli annunci
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;