// Funzione che permette di effettuare il logout dell'utente
const logoutUser = async (req, res, next) => { // Approfondire parametri req, res, next
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout effettuato con successo" });
    } catch (error) {
        next(error);
    }
}

module.exports = logoutUser;    