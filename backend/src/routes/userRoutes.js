const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/fotoMiddleware");

// Importa i controller
const verifyUser = require("../controllers/signupUser");
const authenticate = require("../controllers/authUser");
const verifyToken = require("../controllers/validateToken");
const logout = require("../controllers/logoutUser");
const updateAccount = require("../controllers/updateAccount");
const trovaUser = require("../controllers/trovaUser");

router.post("/verify", verifyUser);
router.post("/authenticate", authenticate);
router.get("/loggedin", auth, verifyToken);
router.get("/logout", auth, logout);
router.get("/trovaUser", auth, trovaUser)
router.post("/updateAccount", auth, upload.single('fotoProfilo'), updateAccount);

module.exports = router;