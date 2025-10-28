/**
 * Multer configuration that stores profile pictures on disk and validates the file type.
 */
const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Prefix the filename with a timestamp to avoid collisions.
    }
  });

  // Accept only JPEG and PNG files up to 5MB.
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Solo immagini con estensioni .jpeg, .jpg, .png sono consentite');
      }
    }
  })

  module.exports = upload; 