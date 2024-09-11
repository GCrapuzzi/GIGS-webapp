const User = require('../models/userSchema'); 

// Funzione per il caricamento della foto profilo
const caricamentoFoto = async (req, res) => {
  try {
    // Verifica se il file è stato caricato
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file selezionato' });
    }

    // Ottieni l'ID dell'utente (es. da token o sessione)
    const userId = req.user.id; 
    const filePath = `/assets/${req.file.filename}`; // Percorso del file caricato

    // Aggiorna l'utente con il nuovo percorso della foto profilo
    await User.findByIdAndUpdate(userId, { profilePicture: filePath });

    // Risposta di successo
    res.json({ message: 'Foto profilo caricata con successo', filePath });
  } catch (error) {
    console.error('Errore nel salvataggio della foto profilo:', error);
    res.status(500).json({ message: 'Errore nel salvataggio della foto profilo' });
  }
};

module.exports = caricamentoFoto;


