const Annuncio = require('../models/annuncioSchema');

const filtraAnnunci = async (req, res) => {
  const { prezzoMin, prezzoMax, lavoro, zona } = req.body;

  // Controllo generale sui parametri - verifica che tutti i parametri siano presenti (tutti e quattro applicati contemporaneamente)
  if (prezzoMin === undefined || prezzoMax === undefined || lavoro === undefined || zona === undefined) {
    return res.status(400).json({ message: 'Tutti i parametri (prezzoMin, prezzoMax, lavoro, zona) sono richiesti' });
  }

  // Controlla se prezzoMin è undefined
  let prezzoMinNumero;
  if (prezzoMin !== undefined) {
    prezzoMinNumero = parseInt(prezzoMin, 10);
    // Verifica se la conversione a numero è valida
    if (isNaN(prezzoMinNumero)) {
      return res.status(400).json({ message: 'prezzoMin deve essere un numero intero valido' });
    }
  } else {
    return res.status(400).json({ message: 'prezzoMin è richiesto' });
  }
  
  // Controlla se prezzoMax è undefined
  let prezzoMaxNumero;
  if (prezzoMax !== undefined) {
    prezzoMaxNumero = parseInt(prezzoMax, 10);
    // Verifica se la conversione a numero è valida
    if (isNaN(prezzoMaxNumero)) {
      return res.status(400).json({ message: 'prezzoMax deve essere un numero intero valido' });
    }
  } else {
    return res.status(400).json({ message: 'prezzoMax è richiesto' });
  }
  
  // Verifica che prezzoMin non sia maggiore di prezzoMax
  if (prezzoMinNumero > prezzoMaxNumero) {
    return res.status(400).json({ message: 'prezzoMin non può essere maggiore di prezzoMax' });
  }

  // Normalizza il parametro zona (quando salviamo nel database non lo facciamo però)
  const zonaNormalized = zona.trim().toLowerCase();

   // Filtro
   const filtro = {};
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
    const annunci = await Annuncio.find(filtro);
    res.json(annunci);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = filtraAnnunci;
