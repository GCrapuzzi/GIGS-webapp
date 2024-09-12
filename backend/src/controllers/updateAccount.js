const User = require("../models/userSchema");

async function updateAccount(req, res) {
    const {nome, cognome } = req.body;
    const biografia = req.body.biografia || '';
    const userId = req.userId;

    // Verifica che l'ID dell'account e i dati necessari siano forniti
    if (!nome || !cognome || !req.file) {
        return res.status(400).json({ message: 'Tutti i campi (nome, cognome e foto) sono obbligatori' });
    }

    // Salva il percorso dell'immagine caricata
    const fotoProfilo = `/uploads/${req.file.filename}`;
    
    // Cerca l'account nel database e aggiorna i campi
    try {
        const accountCompleto = await User.findByIdAndUpdate(
            userId,
            {
                nome: nome,
                cognome: cognome,
                profileImageUrl: fotoProfilo,
                biografia: biografia
            },
            { new: true }
        );

        // Restituisce il documento aggiornato come conferma
        res.status(200).json({ message: 'Account aggiornato con successo', account: accountCompleto});
    } catch (err) {
        res.status(500).json({ message: 'Errore interno del server' });
    }
}

module.exports = updateAccount;
