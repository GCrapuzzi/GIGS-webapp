/**
 * Lists gigs that match the requested city and job type.
 */
const Annuncio = require('../models/annuncioSchema');

const listingAnnunci = async (req, res) => {
    try {
        // Extract filters from the query string.
        const { città, tipoLavoro} = req.query;

        // Both filters are mandatory for this listing view.
        if (!città || !tipoLavoro) {
            return res.status(400).json({ error: 'I parametri citta e tipoLavoro sono obbligatori' });
        }

        try {
            // Fetch the matching gigs including essential profile information.
            const annunci = await Annuncio.find({ città: città, lavoro: tipoLavoro })
                .populate('userId', 'profileImageUrl nome cognome biografia number');

            // Provide a user-friendly message when the query returns no matches.
            if (annunci.length === 0) {
                return res.status(404).json({ message: 'Nessun annuncio trovato per i parametri specificati' });
            }

            // Respond with the list of gigs otherwise.
            return res.status(200).json({message: 'Annunci trovati', annunci});
        } catch (err) {
            // Handle database failures gracefully.
            return res.status(500).json({message: 'Errore nel recupero degli annunci'});
        }
    } catch (err) {
        // Bubble up unexpected exceptions.
        return res.status(500).json({message: 'Errore interno del server'});
    }
};

module.exports = listingAnnunci;
