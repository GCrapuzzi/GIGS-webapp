const express = require("express");
const router = express.Router();
const login = require('../controllers/login');
const createUser = require("../controllers/signUp");
const logout = require("../controllers/logout");

router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
