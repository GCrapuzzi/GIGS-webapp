/**
 * Retrieves all gigs created by a specific user.
 */
const Annuncio = require('../models/annuncioSchema');

const listingAnnunciDiUnUtente = async (req, res) => {
    const userId = req.userId || req.query.userId; // Works for authenticated users and public profile requests.

    try{
        const annunci = await Annuncio.find({userId: userId}).populate('userId', 'profileImageUrl nome cognome biografia number');

        // Guard against empty portfolios.
        if (annunci.length === 0) {
            return res.status(404).json({ message: 'Nessun annuncio trovato per l\' utente' });
        }

        // Return the full list when available.
        res.json(annunci);
    } catch (error) {
        // Signal a server-side failure.
        return res.status(500).json({message: 'Errore nel recupero degli annunci'});
    }
}

module.exports = listingAnnunciDiUnUtente;