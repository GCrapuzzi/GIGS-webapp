const User = require('../models/userSchema'); 
const Annunci = require('../models/annuncioSchema');

// Funzione per creare un annuncio con la foto profilo dell'utente
async function createAnnuncio(req, res, next) {
    const { number,città, lavoretto, titolo, descrizione, token, tariffa, orario } = req.body;

    try {
        // Da cambiare -> utilizzare userId estratto tramite middleware dal token
        const utenteCreatore = await User.findOne({ number: number });

        if (!utenteCreatore) {
            return res.status(404).json({ error: 'Utente non trovato per il numero di telefono fornito' });
        }

        // Genera dinamicamente il link al profilo dell'utente
        const profiloLink = `${req.protocol}://${req.get('host')}/users/${userId}`;

        // Crea un nuovo annuncio con il link al profilo dell'utente
        const nuovoAnnuncio = new Annunci({
            titolo: titolo,
            descrizione: descrizione,
            città: città,
            lavoretto: lavoretto,
            userId: utenteCreatore._id, // Riferimento all'utente che ha creato l'annuncio
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