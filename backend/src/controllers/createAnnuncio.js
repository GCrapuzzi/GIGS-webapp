const User = require('../models/userSchema'); 
const Annunci = require('../models/annuncioSchema');

// Funzione per creare un annuncio con la foto profilo dell'utente
async function createAnnuncio(req, res, next) {
    const { città, lavoretto, titolo, descrizione, tariffa, orario, userId } = req.body;

    try {
        // Genera dinamicamente il link al profilo dell'utente
        const profiloLink = `${req.protocol}://${req.get('host')}/users/${userId}`;

        // Crea un nuovo annuncio con il link al profilo dell'utente
        const nuovoAnnuncio = new Ad({
            titolo: titolo,
            descrizione: descrizione,
            città: città,
            lavoretto: lavoretto,
            user_id: userId, // Riferimento all'utente che ha creato l'annuncio
            link: profiloLink, // Link al profilo dell'utente creatore
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