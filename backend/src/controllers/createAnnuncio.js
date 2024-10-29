const annuncio = require('../models/annuncioSchema');

// Funzione per creare un annuncio 
const createAnnuncio = async (req, res) => {
    try {
        // Estrae i dati dall'oggetto req.body
        const { città, lavoro, titolo, descrizione, tariffa, orario } = req.body;
        const userId = req.userId; 

        // Verifica che tutti i campi siano presenti
        if (!città || !lavoro || !titolo || !descrizione || !tariffa || !orario || città==="null") { // VEDERE CON CRISTIAN, città==="null"
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Verifica che l'annuncio non sia già presente nel database
        const existingAnnuncio = await annuncio.findOne({ userId: userId, lavoro: lavoro, città: città }); // Può restituire null
        if (existingAnnuncio) { // Se diverso da null
            return res.status(400).json({ message: 'Annuncio già presente' });
        }

        // Crea un nuovo annuncio
        try {
            const newAnnuncio = new annuncio({
                titolo: titolo,
                descrizione: descrizione,
                città: città,
                lavoro: lavoro,
                userId: userId,
                tariffa: tariffa,
                orario: orario
            });

            // Salva il nuovo annuncio nel database
            await newAnnuncio.save();

            // Invia la risposta al client
            return res.status(201).json({ message: 'Annuncio creato con successo', annuncio: newAnnuncio });
        } catch (error) {
            return next({ statusCode: 500, message: 'Errore durante il salvataggio dell\'annuncio' });
        }
    } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
    }
};

module.exports = createAnnuncio;