const path = require("path");
const multer = require('multer');

// Configurazione Multer per salvare le immagini in assets
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'assets'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Aggiunge un timestamp al nome del file per rendere il nome della foto univoco
    }
  });
  
  // Filtra solo immagini 
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limite di 1MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Solo immagini!');
      }
    }
  }).single('fotoProfilo'); // 'profilePicture' è il nome del campo nel form

  module.exports = { upload }; 