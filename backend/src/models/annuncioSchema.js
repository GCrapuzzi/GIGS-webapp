const mongoose=require("mongoose");

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      number: String,
      città: String,
      lavoretto: String
})

// Modello per gli annunci
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;