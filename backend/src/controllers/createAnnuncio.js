const User = require('../models/userSchema'); 
const Annunci = require('../models/annuncioSchema');

// Funzione per creare un annuncio con la foto profilo dell'utente
async function createAnnuncio(req, res, next) {
    const { number, città, lavoretto, titolo, descrizione, token,tariffa, orario, userId } = req.body;

    try {

        // Genera dinamicamente il link al profilo dell'utente
        const profiloLink = `${req.protocol}://${req.get('host')}/users/${utenteCreatore._id}`;

        // Crea un nuovo annuncio con il link al profilo dell'utente
        const nuovoAnnuncio = new Annunci({
            titolo: titolo,
            descrizione: descrizione,
            città: città,
            lavoretto: lavoretto,
            tariffa: tariffa,
            userId: utenteCreatore._id, // Riferimento all'utente che ha creato l'annuncio
            link: profiloLink, // Link al profilo dell'utente creatore
            fotoProfilo: utenteCreatore.profileImageUrl // Foto profilo dell'utente creatore
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


