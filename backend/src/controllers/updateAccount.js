/**
 * Updates the authenticated user's profile details and optionally their phone number.
 */
const User = require("../models/userSchema");

const updateAccount = async (req, res) => {
    const { nome, cognome, biografia} = req.body;
    let oldPhoneNumber = req.body.oldPhoneNumber;
    let newPhoneNumber = req.body.newPhoneNumber;
    let newPhoneNumberConferm = req.body.newPhoneNumberConferm;
    const userId = req.userId;

    // Capture the uploaded profile picture path if provided.
    const fotoProfilo = req.file ? `/uploads/${req.file.filename}` : "";

    if (newPhoneNumber && !newPhoneNumber.startsWith('+39')) {
        newPhoneNumber = `+39${newPhoneNumber}`;
    }
    if (oldPhoneNumber && !oldPhoneNumber.startsWith('+39')) {
        oldPhoneNumber = `+39${oldPhoneNumber}`;
    }
    if (newPhoneNumberConferm && !newPhoneNumberConferm.startsWith('+39')) {
        newPhoneNumberConferm = `+39${newPhoneNumberConferm}`;
    }

    try {
        // Load the user profile once.
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        if (!nome && !cognome && !biografia && !fotoProfilo) {
            return res.status(400).json({ message: "Non c'è nulla da modificare" });
        }

        if(oldPhoneNumber && newPhoneNumber && newPhoneNumber){
            // Ensure all phone number fields are provided when updating the number.
            if (!oldPhoneNumber || !newPhoneNumber || !newPhoneNumberConferm) {
                return res.status(400).json({ message: "Tutti i campi del numero di telefono devono essere forniti se uno è presente" });
            }

            // Confirm the existing number matches the stored value.
            if (user.number !== oldPhoneNumber) {
                return res.status(400).json({ message: "Il numero di telefono attuale non corrisponde" });
            }

            // Validate the new number confirmation.
            if (newPhoneNumber !== newPhoneNumberConferm) {
                return res.status(400).json({ message: "Il nuovo numero di telefono non corrisponde alla conferma" });
            }

            // Persist the new phone number.
            user.number = newPhoneNumber;
        }

        // Update profile fields when provided.
        if (nome) user.nome = nome;
        if (cognome) user.cognome = cognome;
        if (biografia) user.biografia = biografia;
        if (fotoProfilo) user.profileImageUrl = fotoProfilo;

        // Commit the changes.
        const accountCompleto = await user.save();

        // Return the updated profile to the client.
        res.status(200).json({ message: 'Account aggiornato con successo', account: accountCompleto });

    } catch (err) {
        res.status(500).json({ message: 'Errore interno del server' });
    }
}

module.exports = updateAccount;
