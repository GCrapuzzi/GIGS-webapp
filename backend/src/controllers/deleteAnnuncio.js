const Annuncio = require('../models/annuncioSchema');

// Funzione per eliminare un annuncio
const deleteAnnuncio = async (req, res) => {
    try {  
        // Estrae l'id dell'annuncio dall'oggetto req.params
        const annuncioId = req.params.id; // VEDERE CON CRISTIAN, cos'è params

        // Cerca l'annuncio nel database
        const annuncio = await Annuncio.findOne({ _id: annuncioId });

        // Verifica se l'annuncio è presente
        if (!annuncio) {
            return res.status(404).json({ message: 'Annuncio non trovato' });
        }

        // Elimina l'annuncio dal database
        try {
            await Annuncio.deleteOne({ _id: annuncioId });
            return res.status(200).json({ message: 'Annuncio eliminato con successo' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'annuncio' });
        }
    } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
    }
};

module.exports = deleteAnnuncio;