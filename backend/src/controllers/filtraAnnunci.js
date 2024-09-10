const Annuncio = require('../models/annuncioSchema');

const filtraAnnunci = async (req, res) => {
  const { prezzoMin, prezzoMax, lavoro, città } = req.query;

  const filtro = {};

  let prezzoMinNumero = prezzoMin !== null ? parseInt(prezzoMin, 10) : null;
  let prezzoMaxNumero = prezzoMax !== null ? parseInt(prezzoMax, 10) : null;
  
  // Validazioni e filtri
  if (prezzoMinNumero !== null && isNaN(prezzoMinNumero)) {
    return res.status(400).json({ message: 'prezzoMin deve essere un numero intero valido' });
  }
  
  if (prezzoMaxNumero !== null && isNaN(prezzoMaxNumero)) {
    return res.status(400).json({ message: 'prezzoMax deve essere un numero intero valido' });
  }
  
  // Ensure prezzoMin is not greater than prezzoMax
  if (prezzoMinNumero !== null && prezzoMaxNumero !== null && prezzoMinNumero > prezzoMaxNumero) {
    return res.status(400).json({ message: 'prezzoMin non può essere maggiore di prezzoMax' });
  }
  
  // Filtro per il prezzo
  if (prezzoMinNumero !== null || prezzoMaxNumero !== null) {
    filtro.tariffa = {};
    if (prezzoMinNumero !== null) {
      filtro.tariffa.$gte = prezzoMinNumero;
    }
    if (prezzoMaxNumero !== null) {
      filtro.tariffa.$lte = prezzoMaxNumero;
    }
  }

  // Filtro per il lavoro, se presente
  if (lavoro !== '') {
    filtro.lavoro = lavoro;
  }

  // Filtro per la città (zona), se presente
  if (città !== '') {
    filtro.città = città;
  }

  try {
    const annunci = await Annuncio.find(filtro).populate('userId', 'profileImageUrl nome cognome');
    res.json(annunci);
  } catch (error) {
    console.error('Errore durante la query:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = filtraAnnunci;

