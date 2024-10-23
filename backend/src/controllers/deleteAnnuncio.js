const Annuncio = require('../models/annuncioSchema');

// Funzione per eliminare un annuncio
const deleteAnnuncio = async (req, res, next) => {
    
    // Estrae l'id dell'annuncio dall'oggetto req.params
    const annuncioId = req.params.id;

    // Cerca l'annuncio nel database
    const annuncio = await Annuncio.findOne({ _id: annuncioId });

    // Verifica se l'annuncio è presente
    if (!annuncio) {
        return res.status(404).json({ message: 'Annuncio non trovato' });
    }

    // Elimina l'annuncio dal database
    try {
        await Annuncio.deleteOne({ _id: annuncioId });
        return res.json({ message: 'Annuncio eliminato con successo' });
    }
    catch (error) {
        return next({ statusCode: 500, message: 'Errore durante l\'eliminazione dell\'annuncio' });
    }
}

module.exports = deleteAnnuncio;