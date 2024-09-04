const User = require("../models/userSchema");

async function completeAccount(req, res) {

    const { userId, nome, cognome, fotoBase64 } = req.body;

        // Verifica che l'ID dell'account e i dati necessari siano forniti
        if (!accountId || !nome || !cognome || !fotoBase64) {
            return res.status(400).json({ message: 'Tutti i campi (accountId, nome, cognome e foto) sono obbligatori' });
        }

       
    try {

        // Trova l'account esistente e aggiorna i campi nome, cognome, e fotoProfilo
        const accountAggiornato = await Account.findByIdAndUpdate(
            userId,  // ID dell'account da aggiornare
            {
                nome: nome,
                cognome: cognome,
                profileImageUrl: {
                    data: buffer,
                    contentType: 'image/png'  // Specifica il tipo MIME corretto
                }
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
