const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const foto = require("../middleware/fotoMiddleware");
const caricamentoFoto = require("../controllers/caricamentoFoto");

// Importa i controller
const verifyUser = require("../controllers/signupUser");
const authenticate = require("../controllers/authUser");
const verifyToken = require("../controllers/validateToken");
const logout = require("../controllers/logoutUser");
const updateAccount = require("../controllers/updateAccount");

router.post("/verify", verifyUser);
router.post("/authenticate", authenticate);
router.get("/loggedin", auth, verifyToken);
router.get("/logout", auth, logout);
router.post("/updateAccount", auth, updateAccount);
router.post("/fotoProfilo", foto, caricamentoFoto);

module.exports = router;