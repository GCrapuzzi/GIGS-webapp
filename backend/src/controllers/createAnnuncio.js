const User = require('../models/userSchema'); 
const Annunci = require('../models/annuncioSchema');

// Funzione per creare un annuncio con la foto profilo dell'utente
async function createAnnuncio(req, res, next) {
    const { città, lavoretto, titolo, descrizione, userId, tariffa, orario } = req.body;

    try {
        // Crea un nuovo annuncio con il link al profilo dell'utente
        const nuovoAnnuncio = new Annunci({
            titolo: titolo,
            descrizione: descrizione,
            città: città,
            lavoretto: lavoretto,
            user_id: userId,
            tariffa: tariffa,
            orario: orario
        });

        // Salva il nuovo annuncio nel database
        await nuovoAnnuncio.save();

        // Invia la risposta al client
        res.status(201).json({ message: 'Annuncio creato con successo', annuncio: nuovoAnnuncio });
    } catch (error) {
        // Passa l'errore al middleware di gestione degli errori
        next(error);
    }
}

module.exports = createAnnuncio;