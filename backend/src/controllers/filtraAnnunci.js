const Annuncio = require('../models/annuncioSchema');

const filtraAnnunci = async (req, res) => {
  const { prezzoMin, prezzoMax, lavoro, città } = req.query;

  // Initialize the filter object
  const filtro = {};

  // Parse and validate prezzoMin and prezzoMax, and apply them to "tariffa"
  const prezzoMinNumero = prezzoMin !== '' ? parseInt(prezzoMin, 10) : null;
  const prezzoMaxNumero = prezzoMax !== '' ? parseInt(prezzoMax, 10) : null;

  if (prezzoMinNumero !== null && isNaN(prezzoMinNumero)) {
    return res.status(400).json({ message: 'prezzoMin deve essere un numero intero valido' });
  }

  if (prezzoMaxNumero !== null && isNaN(prezzoMaxNumero)) {
    return res.status(400).json({ message: 'prezzoMax deve essere un numero intero valido' });
  }

  // Ensure prezzoMin is not greater than prezzoMax, if both are present
  if (prezzoMinNumero !== null && prezzoMaxNumero !== null && prezzoMinNumero > prezzoMaxNumero) {
    return res.status(400).json({ message: 'prezzoMin non può essere maggiore di prezzoMax' });
  }

  // Apply tariffa filter based on prezzoMin and prezzoMax
  if (prezzoMinNumero !== null || prezzoMaxNumero !== null) {
    filtro.tariffa = {};
    if (prezzoMinNumero !== null) filtro.tariffa.$gte = prezzoMinNumero;
    if (prezzoMaxNumero !== null) filtro.tariffa.$lte = prezzoMaxNumero;
  }

  // Add lavoro filter if present and not an empty string
  if (lavoro !== '') {
    filtro.lavoro = lavoro;
  }

  // Normalize and add città filter if present and not an empty string
  if (città !== '') {
    const cittàNormalized = città.trim().toLowerCase();
    // Confronto case-insensitive: normalizza il campo città degli annunci
    filtro.città = new RegExp(`^${cittàNormalized}$`, 'i'); // Regex per confronto case-insensitive
  }

  try {
    const annunci = await Annuncio.find(filtro).populate('userId', 'profileImageUrl nome cognome');;
    res.json(annunci);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = filtraAnnunci;
