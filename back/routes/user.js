const express = require("express");

const passwordValidator = require("../middleware/password-validator");
const emailValidator = require("../middleware/email-validator");

// Initialisation du router
const router = express.Router();

const userCtrl = require("../controllers/user");

// Creation des routes post
router.post("/signup", emailValidator, passwordValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
