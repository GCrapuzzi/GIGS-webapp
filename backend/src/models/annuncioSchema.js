const mongoose=require("mongoose");

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      titolo: String,
      number: String,
      città: String,
      lavoro: String,
      tariffa: String,
      descrizione: String,
      orario: String,
      user_id: String
})

// Modello per gli annunci
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;