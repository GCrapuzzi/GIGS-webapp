const annuncio = require('../models/annuncioSchema');

// Funzione per creare un annuncio 
const createAnnuncio = async (req, res, next) => {

    // Estrae i dati dall'oggetto req.body
    const { città, lavoro, titolo, descrizione, userId, tariffa, orario } = req.body;

    // Verifica che tutti i campi siano presenti
    if (!città || !lavoro || !titolo || !descrizione || !tariffa || !orario) {
        return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
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
        res.status(201).json({ message: 'Annuncio creato con successo', annuncio: newAnnuncio });
    } catch (error) {
        // Passa l'errore al middleware di gestione degli errori
        next(error);
    }
}

module.exports = createAnnuncio;