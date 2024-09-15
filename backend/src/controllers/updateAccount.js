const User = require("../models/userSchema");

async function updateAccount(req, res) {
    const {nome, cognome } = req.body;
    const oldPhoneNumber = req.body.oldPhoneNumber;
    const newPhoneNumber = req.body.newPhoneNumber;
    const newPhoneNumberConferm = req.body.newPhoneNumberConferm;
    const biografia = req.body.biografia || '';
    const userId = req.userId;


    console.log("Request body:", req.body); 
    // Salva il percorso dell'immagine caricata
    const fotoProfilo = req.file ? `/uploads/${req.file.filename}` : null;
    

    try {
        // Trova l'utente per ID
        const user = await User.findById(userId);
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        // Verifica se il numero di telefono attuale corrisponde e aggiorna il numero
        if (oldPhoneNumber === "" && newPhoneNumber === "" && newPhoneNumberConferm === "") {
            if (oldPhoneNumber !== "" || newPhoneNumber !== "" || !newPhoneNumberConferm !== "") {
                return res.status(400).json({ message: "Tutti i campi del numero di telefono devono essere forniti" });
            }

            // Controllo se il vecchio numero di telefono corrisponde
            if (user.number !== oldPhoneNumber) {
                return res.status(400).json({ message: "Il numero di telefono attuale non corrisponde" });
            }

            // Verifica se il nuovo numero di telefono e la conferma coincidono
            if (newPhoneNumber !== newPhoneNumberConferm) {
                return res.status(400).json({ message: "Il nuovo numero di telefono non corrisponde con la conferma" });
            }

            // Aggiorna il numero di telefono
            user.number = newPhoneNumber;
        }

        // Aggiungi i campi che devono essere aggiornati
        if (nome) user.nome = nome;
        if (cognome) user.cognome = cognome;
        if (biografia) user.biografia = biografia;
        if (fotoProfilo) user.profileImageUrl = fotoProfilo;

        // Aggiorna l'utente nel database
        const accountCompleto = await user.save();

        // Restituisci il documento aggiornato come conferma
        res.status(200).json({ message: 'Account aggiornato con successo', account: accountCompleto });

    } catch (err) {
        res.status(500).json({ message: 'Errore interno del server' });
    }
}

module.exports = updateAccount;