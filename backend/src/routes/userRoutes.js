const express = require("express");
const router = express.Router();
const verifyUser = require("../controllers/verifyUser");
const authenticate = require("../controllers/authenticate");
const verifyToken = require("../controllers/verifyToken");

router.post("/verify", verifyUser);
router.post("/authenticate", authenticate);


router.get("/loggedin", verifyToken);


module.exports = router;
