const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Importa i controller
const verifyUser = require("../controllers/verifyUser");
const authenticate = require("../controllers/authenticate");
const verifyToken = require("../controllers/verifyToken");

router.post("/verify", verifyUser);
router.post("/authenticate", authenticate);
router.get("/loggedin", auth, verifyToken);

module.exports = router;