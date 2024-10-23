const User = require('../models/userSchema');

// Funzione per elimiare i dati dell'utente
const deleteUserdata = async (req, res, next) => {

    // Estrae l'id dell'utente dall'oggetto req.userId
    const userId = req.userId;

    // Cerca l'utente nel database
    const user = await User.findOne ({_id: userId});

    // Verifica se l'utente è presente
    if (!user) {
        return res.status(404).json({ message: 'Utente non trovato' });
    }
    
    // Elimina l'utente dal database
    try {
        await User.deleteOne({ _id: userId });
        res.clearCookie("token");
        return res.json({ message: 'Utente eliminato con successo' });
    }
    catch (error) {
        return next({ statusCode: 500, message: 'Errore durante l\'eliminazione dell\'utente' });
    }
}

module.exports = deleteUserdata;