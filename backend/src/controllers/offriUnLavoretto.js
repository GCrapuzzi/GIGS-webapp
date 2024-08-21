const annuncio = require("../models/annuncioSchema"); 

const offriUnLavoretto = async (req, res) => {
    // Verifica che i campi necessari siano presenti
    const { number, città, lavoretto } = req.body;
    if (!number || !città || !lavoretto) {
        return res.status(400).send("All input is required");
    }

    try {
        // Salvataggio dell'annuncio nel database
        const salvato = await annuncio.create({ number, città, lavoretto });
        // Invia una risposta con l'annuncio salvato
        return res.status(201).json(salvato);
    } catch (error) {
        // Gestione degli eventuali errori nel salvataggio
        return res.status(500).send("Errore durante il salvataggio dell'annuncio");
    }
};

module.exports = offriUnLavoretto;

