const mongoose=require("mongoose");

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      number: String,
      città: String,
      lavoretto: String
})

// Creo il modello
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;