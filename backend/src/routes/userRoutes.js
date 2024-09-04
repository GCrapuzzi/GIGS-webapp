const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Importa i controller
const verifyUser = require("../controllers/signupUser");
const authenticate = require("../controllers/authUser");
const verifyToken = require("../controllers/validateToken");
const logout = require("../controllers/logoutUser");
const completeAccount = require("../controllers/completeAccount");

router.post("/verify", verifyUser);
router.post("/authenticate", authenticate);
router.get("/loggedin", auth, verifyToken);
router.get("/logout", auth, logout);
router.post("/completeAccount", auth, completeAccount);

module.exports = router;