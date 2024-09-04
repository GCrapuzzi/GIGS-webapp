const User = require("../models/userSchema");

async function completeAccount(req, res) {

    const { userId, nome, cognome, fotoProfilo } = req.body;

        // Verifica che l'ID dell'account e i dati necessari siano forniti
        if (!nome || !cognome || !fotoProfilo) {
            return res.status(400).json({ message: 'Tutti i campi (nome, cognome e foto) sono obbligatori' });
        }

       
    try {

        // Trova l'account esistente e aggiorna i campi nome, cognome, e fotoProfilo
        const accountCompleto = await Account.findByIdAndUpdate(
            userId,  // ID dell'account da aggiornare
            {
                nome: nome,
                cognome: cognome,
                profileImageUrl: fotoProfilo
            },
            { new: true }  // Restituisce il documento aggiornato
        );


        // Restituisce il documento aggiornato come conferma
        res.status(200).json({ message: 'Account aggiornato con successo', account: accountAggiornato });
    } catch (err) {
        console.error('Errore durante il\' completamento del\'profilo:', err);
        res.status(500).json({ message: 'Errore interno del server' });
    }
}

module.exports = completeAccount;
