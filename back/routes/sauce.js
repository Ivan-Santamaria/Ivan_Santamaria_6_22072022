//// Importation d'express
const express = require("express");
//// Initialisation du router
const router = express.Router();
//
//
//
//// Importation de middleware d'authentification
////// Permettra à l'uploader d'une sauce d'être le seul capable de modifier ou supprimer une sauce
////// Les autres utilisateurs pourront liker ou disliker une sauce
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
//
//
//
//// Importation du controller sauce.js qui contient les fonctions permettant:
////// L'upload de sauce, la récupération, la modification, la suppression et l'appréciation
const sauceCtrl = require("../controllers/sauce");
//
//
//
//// Création des routes pour les sauces
//
////// Enregistre une sauce dans la base de données
router.post("/", auth, multer, sauceCtrl.createSauce);
////// Mettre à jour une sauce existante
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
////// Supprimer une sauce
router.delete("/:id", auth, multer, sauceCtrl.deleteSauce);
////// Récupération d'une sauce spécifique
router.get("/:id", auth, sauceCtrl.getOneSauce);
////// Renvoie toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauces);
////// Like ou Dislike
router.post("/:id/like", auth, sauceCtrl.likeOrNot);
//
//
//
module.exports = router;
