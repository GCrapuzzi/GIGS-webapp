/**
 * Returns gig listings filtered by price range, job category, and city.
 */
const Annuncio = require('../models/annuncioSchema');

const filtraAnnunci = async (req, res) => {
  try{
    const { prezzoMin, prezzoMax, lavoro, città } = req.query;
    const filtro = {}; // Filter object dynamically populated based on provided parameters.

    // Convert price boundaries to integers before validating them.
    let prezzoMinNumero;
    if (prezzoMin) {
      prezzoMinNumero = parseInt(prezzoMin, 10);
    } else {
      prezzoMinNumero = null;
    }

    let prezzoMaxNumero;
    if (prezzoMax) {
      prezzoMaxNumero = parseInt(prezzoMax, 10);
    } else {
      prezzoMaxNumero = null;
    }

    // Reject invalid numbers.
    if (prezzoMinNumero !== null && isNaN(prezzoMinNumero)) {
      return res.status(400).json({ message: 'prezzoMin deve essere un numero intero valido' });
    }

    if (prezzoMaxNumero !== null && isNaN(prezzoMaxNumero)) {
      return res.status(400).json({ message: 'prezzoMax deve essere un numero intero valido' });
    }

    // Ensure the provided range makes sense.
    if (prezzoMinNumero > prezzoMaxNumero) {
      return res.status(400).json({ message: 'prezzoMin non può essere maggiore di prezzoMax' });
    }

    // Apply the price range when present.
    if (prezzoMinNumero !== null || prezzoMaxNumero !== null) {
      filtro.tariffa = {};
      if (prezzoMinNumero !== null) {
        filtro.tariffa.$gte = prezzoMinNumero;
      }
      if (prezzoMaxNumero !== null) {
        filtro.tariffa.$lte = prezzoMaxNumero;
      }
    }

    // Filter by job category.
    if (lavoro && lavoro.trim() !== '') {
      filtro.lavoro = lavoro;
    }

    // Filter by city name.
    if (città && città.trim() !== '') {
      filtro.città = città;
    }

    // Execute the query and expand the user reference for profile data.
    try {
      const annunci = await Annuncio.find(filtro).populate('userId', 'profileImageUrl nome cognome');
      return res.status(200).json({ message: 'Annunci filtrati', annunci });
    } catch (error) {
      return res.status(500).json({ message: "Errore durante il fltraggio degli annunci" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};

module.exports = filtraAnnunci;
