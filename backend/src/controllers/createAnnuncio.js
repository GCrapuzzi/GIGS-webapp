const annuncio = require('../models/annuncioSchema');

// Funzione per creare un annuncio 
const createAnnuncio = async (req, res, next) => {

    // Estrae i dati dall'oggetto req.body
    const { città, lavoro, titolo, descrizione, userId, tariffa, orario } = req.body;

    // Verifica che tutti i campi siano presenti
    if (!città || !lavoro || !titolo || !descrizione || !tariffa || !orario) {
        return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
    }

    // Verifica che l'annuncio non sia già presente nel database
    //const existingAnnuncio = await annuncio.findOne({ userId: userId, lavoro: lavoro, città: città });
   // if (existingAnnuncio) {
        //return res.status(400).json({ message: 'Annuncio già presente' });
   // }

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
        return next({ statusCode: 500, message: 'Errore durante la creazione dell\'annuncio' });
    }
}

module.exports = createAnnuncio;