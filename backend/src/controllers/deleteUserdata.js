const User = require('../models/userSchema');

// Funzione per elimiare i dati dell'utente
const deleteUserdata = async (req, res) => {
    try {
        // Estrae l'id dell'utente dall'oggetto req.userId
        const userId = req.userId;

        // Cerca l'utente nel database
        const user = await User.findOne ({_id: userId}); // Restituisce null se non trova l'utente

        // Verifica se l'utente è presente
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        
        // Elimina l'utente dal database
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