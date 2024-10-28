const User = require("../models/userSchema");


// VEDERE CON CRISTIAN
const updateAccount = async (req, res) => {
    const { nome, cognome} = req.body;
    const biografia = ''; // VEDERE CON CRISTIAN
    let oldPhoneNumber = req.body.oldPhoneNumber;
    let newPhoneNumber = req.body.newPhoneNumber;
    let newPhoneNumberConferm = req.body.newPhoneNumberConferm;
    const userId = req.userId;

    // Salva il percorso dell'immagine caricata
    const fotoProfilo = req.file ? `/uploads/${req.file.filename}` : "";

    if (newPhoneNumber!==undefined && !newPhoneNumber.startsWith('+39')) {
        newPhoneNumber = `+39${newPhoneNumber}`;
    }
    if (oldPhoneNumber!==undefined && !oldPhoneNumber.startsWith('+39')) {
        oldPhoneNumber = `+39${oldPhoneNumber}`;
    }
    if (newPhoneNumberConferm!==undefined && !newPhoneNumberConferm.startsWith('+39')) {
        newPhoneNumberConferm = `+39${newPhoneNumberConferm}`;
    }

    try {
        // Trova l'utente per ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        if (nome === "" && cognome === "" && biografia === "" && fotoProfilo==="") {
            return res.status(400).json({ message: "Non c'è nulla da modificare" });
        }

        if(oldPhoneNumber!==undefined && newPhoneNumber!==undefined && newPhoneNumber!==undefined){
            // Verifica che tutti i campi del numero di telefono siano forniti se uno è presente
            if (oldPhoneNumber === "" || newPhoneNumber === "" || newPhoneNumberConferm === "") {
                return res.status(400).json({ message: "Tutti i campi del numero di telefono devono essere forniti se uno è presente" });
            }

            // Verifica se il vecchio numero di telefono corrisponde
            if (user.number !== oldPhoneNumber) {
                return res.status(400).json({ message: "Il numero di telefono attuale non corrisponde" });
            }

            // Verifica se il nuovo numero di telefono e la conferma coincidono
            if (newPhoneNumber !== newPhoneNumberConferm) {
                return res.status(400).json({ message: "Il nuovo numero di telefono non corrisponde alla conferma" });
            }

            // Aggiorna il numero di telefono
            user.number = newPhoneNumber; 
        }

        // Aggiorna altri campi del profilo (nome, cognome, biografia, foto profilo)
        if (nome !== "" && nome !== undefined) user.nome = nome;
        if (cognome !== "" && cognome !== undefined) user.cognome = cognome;
        if (biografia !== "" && biografia !== undefined) user.biografia = biografia;
        if (fotoProfilo !== "" && fotoProfilo!== undefined) user.profileImageUrl = fotoProfilo;

        // Salva le modifiche nel database
        const accountCompleto = await user.save();

        // Restituisci l'utente aggiornato come conferma
        res.status(200).json({ message: 'Account aggiornato con successo', account: accountCompleto });

    } catch (err) {
        console.error("Errore nell'aggiornamento dell'account:", err);
        res.status(500).json({ message: 'Errore interno del server' });
    }
}

module.exports = updateAccount;
