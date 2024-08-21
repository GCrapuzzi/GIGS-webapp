const express = require("express");
const router = express.Router();
const offriUnLavoretto = require("../controllers/offriUnLavoretto");
const annuncio = require("../models/annuncioSchema");

router.post("/offriUnLavoretto", offriUnLavoretto);

module.exports = router;