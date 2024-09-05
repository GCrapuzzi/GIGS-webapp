const Annuncio = require('../models/annuncioSchema');
const User = require('../models/userSchema');

async function listingAnnunci(req, res) {
    // Estrai i parametri direttamente dalla richiesta
    const { città, tipoLavoro} = req.query;

    // Verifica se i parametri sono presenti e validi
    if (!città || !tipoLavoro) {
        return res.status(400).json({ error: 'I parametri citta e tipoLavoro sono obbligatori' });
    }

    try {
        // Trova gli annunci che corrispondono ai parametri città e tipo di lavoro
        const annunci = await Annuncio.find({ città: città, lavoro: tipoLavoro }).populate('userId', 'profileImageUrl');

        // Se non ci sono annunci, restituisci un messaggio informativo
        if (annunci.length === 0) {
            return res.status(404).json({ message: 'Nessun annuncio trovato per i parametri specificati' });
        }

        // Restituisce la lista degli annunci come risposta HTTP
        res.json(annunci);
    } catch (err) {
        console.error('Errore durante il recupero degli annunci:', err);
        // Restituisce un errore HTTP 500 al client in caso di fallimento
        res.status(500).send('Errore nel recupero degli annunci');
    }
}

module.exports = listingAnnunci;
