const logout = (req, res, next) => {
    try {
      // Prova a cancellare il cookie
      res.clearCookie("token");
  
      // Rispondi con un messaggio di successo
      return res.json({ message: "Logged out" });
    } catch (error) {
      // Se c'è un errore, passalo al middleware di gestione degli errori
      return next({ statusCode: 500, message: "Errore durante il logout" });
    }
  };
  
  module.exports = logout;
  