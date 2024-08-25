// Funzione che permette di effettuare il logout dell'utente
const logout = (req, res, next) => {
    try {
      res.clearCookie("token");
      return res.json({ message: "Logged out" });
    } catch (error) {
      return next(error);
    }
  };
  
  module.exports = logout;
  