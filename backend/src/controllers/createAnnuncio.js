/**
 * Persists a new gig listing for the authenticated user.
 */
const annuncio = require('../models/annuncioSchema');

const createAnnuncio = async (req, res) => {
    try {
        // Extract gig details from the request body.
        const { città, lavoro, titolo, descrizione, tariffa, orario } = req.body;
        const userId = req.userId;

        // Ensure all required fields are provided.
        if (!città || !lavoro || !titolo || !descrizione || !tariffa || !orario) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Prevent the user from creating duplicate listings for the same job/city combination.
        const existingAnnuncio = await annuncio.findOne({ userId: userId, lavoro: lavoro, città: città });
        if (existingAnnuncio) {
            return res.status(400).json({ message: 'Annuncio già presente' });
        }

        // Instantiate a new gig listing document.
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

            // Persist the document in MongoDB.
            await newAnnuncio.save();

            // Return the created document to the client.
            return res.status(201).json({ message: 'Annuncio creato con successo', annuncio: newAnnuncio });
        } catch (error) {
            return res.status(500).json({message: 'Errore durante il salvataggio dell\'annuncio' });
        }
    } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
    }
};

module.exports = createAnnuncio;