const express = require("express");
const router = express.Router();
const createAnnuncio = require("../controllers/createAnnuncio");

router.post("/createAnnuncio", createAnnuncio);