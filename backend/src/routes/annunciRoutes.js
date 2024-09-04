const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Importa i controller
const createAnnuncio = require("../controllers/createAnnuncio");
const filtraAnnunci = require("../controllers/filtraAnnunci");
const listingAnnunci = require("../controllers/listingAnnunci");

router.post("/createAnnuncio", auth, createAnnuncio);
router.post("/filtra", auth, filtraAnnunci);
router.get("/listing", listingAnnunci);

module.exports = router;