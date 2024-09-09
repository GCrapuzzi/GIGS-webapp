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

  // Normalizza il parametro zona (quando salviamo nel database non lo facciamo però)
  const zonaNormalized = zona.trim().toLowerCase();

   
   if (prezzoMin && prezzoMax) {
     filtro.$expr = {
       $and: [
         { $gte: [{ $toInt: "$prezzo" }, prezzoMinNumero] },
         { $lte: [{ $toInt: "$prezzo" }, prezzoMaxNumero] }
       ]
     };
   }
   if (lavoro) {
     filtro.lavoro = lavoro;
   }
   if (zonaNormalized) {
     filtro.zona = zonaNormalized;
   }
 

  try {
    const annunci = await Annuncio.find(filtro).populate('userId', 'profileImageUrl nome cognome');;
    res.json(annunci);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = filtraAnnunci;
