const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Importa i controller
const createAnnuncio = require("../controllers/createAnnuncio");

router.post("/createAnnuncio", auth, createAnnuncio);

module.exports = router;