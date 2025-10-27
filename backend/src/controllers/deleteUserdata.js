/**
 * Deletes the authenticated user's account and clears their session cookie.
 */
const User = require('../models/userSchema');

const deleteUserdata = async (req, res) => {
    try {
        // Retrieve the authenticated user id from the JWT middleware.
        const userId = req.userId;

        // Load the user document to ensure it exists before deleting.
        const user = await User.findOne ({_id: userId});

        // Return a 404 if the account does not exist anymore.
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        // Delete the user and remove the authentication cookie on success.
        try {
            await User.deleteOne({ _id: userId });
            res.clearCookie("token");
            return res.status(200).json({ message: 'Utente eliminato con successo' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'utente' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Errore interno del server' });
    }
};

module.exports = deleteUserdata;