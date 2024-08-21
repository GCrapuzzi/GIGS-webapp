const express = require("express");
const router = express.Router();
const verifyNumber = require("../controllers/verifyNumber");
const login = require("../controllers/login");

router.post("/signup", verifyNumber);
router.post("/login", login);


module.exports = router;
