////Importation d'express
const express = require("express");
//// Initialisation du router
const router = express.Router();
//
//
//
//// Importation des middleware
const passwordValidator = require("../middleware/password-validator");
const emailValidator = require("../middleware/email-validator");
const maxPasswordAttempt = require("../middleware/password-limiter");
//
//
//
//// Importation du controller user.js qui contient les fonctions pour la création & connexion d'un compte
const userCtrl = require("../controllers/user");
//
//// Creation des routes post
////// Verifiera le mot de passs & l'email avant de continuer vers le controller user.js
////// Ceci permettra d'envoyer des formats valide à la base de donnée
router.post("/signup", passwordValidator, emailValidator, userCtrl.signup);
//// Route permettant à l'utilisateur de récupérer sa session enregistrée sur la BDD
//////Une limite de tentative à été fixée 3
router.post("/login", maxPasswordAttempt.limiter, userCtrl.login);
//
//
//
module.exports = router;
