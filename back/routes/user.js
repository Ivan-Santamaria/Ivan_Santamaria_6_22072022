const express = require("express");

// Initialisation du router
const router = express.Router();

const userCtrl = require("../controllers/user");

// Creation des routes post
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
