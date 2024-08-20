const express = require("express");
const router = express.Router();
const verifyNumber = require("../controllers/verifyNumber");

router.post("/signup", verifyNumber);

module.exports = router;
