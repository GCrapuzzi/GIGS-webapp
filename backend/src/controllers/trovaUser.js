/**
 * Returns the authenticated user's profile details.
 */
const User = require('../models/userSchema');

const trovaUser = async (req, res) => {
    try {
        // Extract the user id injected by the auth middleware.
        const userId = req.userId;

        // Load the user document.
        const user = await User.findOne ({_id: userId});

        // Guard against missing accounts.
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        // Return the user payload.
        return res.status(200).json({ message: 'Utente trovato', user });
    } catch (error) {
        return res.status(500).json({message: "Errore interno al server"});
    };
}

module.exports = trovaUser;