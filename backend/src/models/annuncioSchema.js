const mongoose=require("mongoose");

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      titolo: String,
      città: String,
      lavoro: String,
      tariffa: String, 
      descrizione: String,
      orario: String,
      userId: ObjectId
})

// Modello per gli annunci
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;