const Annuncio = require('../models/annuncioSchema');

// Funzione per aggiornare un annuncio
const updateAnnuncio = async (req, res, next) => {
    // Estrae i dati dall'oggetto req.body
    const { annuncioId, città, lavoro, titolo, descrizione, tariffa, orario } = req.body;

    // Verifica che tutti i campi siano presenti
    if (!città || !lavoro || !titolo || !descrizione || !tariffa || !orario) {
        return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
    }

    // Cerca l'annuncio nel database e aggiorna i campi
    try {
        const annuncio = await Annuncio.findByIdAndUpdate(
            annuncioId,
            {
                titolo: titolo,
                descrizione: descrizione,
                città: città,
                lavoro: lavoro,
                tariffa: tariffa,
                orario: orario
            },
            { new: true }
        );

        // Restituisce il documento aggiornato come conferma
        res.status(200).json({ message: 'Annuncio aggiornato con successo', annuncio: annuncio });
    } catch (error) {
        return next({ statusCode: 500, message: 'Errore durante l\'aggiornamento dell\'annuncio' });
    }
}

module.exports = updateAnnuncio;