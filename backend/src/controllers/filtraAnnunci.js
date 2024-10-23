const Annuncio = require('../models/annuncioSchema');

const filtraAnnunci = async (req, res) => {
  const { prezzoMin, prezzoMax, lavoro, città } = req.query;
  console.log('Query ricevuta:', req.query); // Log dei parametri ricevuti
  const filtro = {}; // Oggetto filtro contenente le proprietà tariffa, lavoro e città che verrà popolato in base ai parametri ricevuti

  // Conversione dei parametri prezzo in numeri interi
  let prezzoMinNumero = prezzoMin ? parseInt(prezzoMin, 10) : null;
  let prezzoMaxNumero = prezzoMax ? parseInt(prezzoMax, 10) : null;

  // Validazione dei parametri prezzoMin e prezzoMax
  if (prezzoMinNumero !== null && isNaN(prezzoMinNumero)) {
    return res.status(400).json({ message: 'prezzoMin deve essere un numero intero valido' });
  }

  if (prezzoMaxNumero !== null && isNaN(prezzoMaxNumero)) {
    return res.status(400).json({ message: 'prezzoMax deve essere un numero intero valido' });
  }

  // Assicurati che prezzoMin non sia maggiore di prezzoMax
  if (prezzoMinNumero !== null && prezzoMaxNumero !== null && prezzoMinNumero > prezzoMaxNumero) {  // rivedere 
    return res.status(400).json({ message: 'prezzoMin non può essere maggiore di prezzoMax' });
  }

  // Filtro per il prezzo (aggiungiamo il filtro solo se prezzoMin o prezzoMax sono specificati)
  if (prezzoMinNumero !== null || prezzoMaxNumero !== null) {
    filtro.tariffa = {}; // Creiamo un oggetto per la proprietà 'tariffa'
    if (prezzoMinNumero !== null) {
      filtro.tariffa.$gte = prezzoMinNumero; // Minimo prezzo
    }
    if (prezzoMaxNumero !== null) {
      filtro.tariffa.$lte = prezzoMaxNumero; // Massimo prezzo
    }
  }

  // Filtro per il lavoro (se specificato)
  if (lavoro && lavoro.trim() !== '') {
    console.log('Lavoro filtrato:', lavoro); // Log di debug
    filtro.lavoro = lavoro;
  }

  // Filtro per la città (se specificato)
  if (città && città.trim() !== '') {
    console.log('Città filtrata:', città); // Log di debug
    filtro.città = città;
  }

  // Effettuiamo la query con il filtro dinamico costruito
  try {
    const annunci = await Annuncio.find(filtro).populate('userId', 'profileImageUrl nome cognome');
    res.status(200).json({ message: 'Annunci filtrati', annunci });
  } catch (error) {
    console.error('Errore durante la query:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = filtraAnnunci;
