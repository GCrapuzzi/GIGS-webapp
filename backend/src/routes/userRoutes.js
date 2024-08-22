const express = require("express");
const router = express.Router();
const verifyUser = require("../controllers/verifyUser");
const authenticate = require("../controllers/authenticate");

router.post("/verify", verifyUser);
router.post("/authenticate", authenticate);


module.exports = router;
