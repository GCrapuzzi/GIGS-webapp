const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Importa i controller
const createAnnuncio = require("../controllers/createAnnuncio");
const filtraAnnunci = require("../controllers/filtraAnnunci");

router.post("/createAnnuncio", auth, createAnnuncio);
router.post("/filtra", auth, filtraAnnunci);

module.exports = router;