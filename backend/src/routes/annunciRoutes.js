/**
 * Routes that expose gig listing CRUD operations.
 */
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const createAnnuncio = require("../controllers/createAnnuncio");
const filtraAnnunci = require("../controllers/filtraAnnunci");
const listingAnnunci = require("../controllers/listingAnnunci");
const listingAnnunciDiUnUtente = require("../controllers/listingAnnunciDiUnUtente");


router.post("/createAnnuncio", auth, createAnnuncio);
router.get("/filtra", filtraAnnunci);
router.get("/listing", listingAnnunci);
router.get("/listingAnnunciUtente", auth, listingAnnunciDiUnUtente);
router.get("/listingAnnunciVisitatore", listingAnnunciDiUnUtente);


module.exports = router;