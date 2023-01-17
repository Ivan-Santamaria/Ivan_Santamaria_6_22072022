// Importation d'express
const express = require("express");
// Initialisation du router
const router = express.Router();

// Importation de middleware d'authentification
// Permettra à l'uploader d'une sauce d'être le seul capable de modifier ou supprimer une sauce
// Les autres utilisateurs pourront liker ou disliker une sauce
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Importation du controller sauce.js qui contient les fonctions permettant:
// L'upload de sauce, la récupération, la modification, la suppression et l'appréciation
const sauceCtrl = require("../controllers/sauce");

// Création des routes pour les sauces
//-------------------------------------

// Enregistre une sauce dans la base de données //
// Passe par l'Authentification pour identifier l'user => Multer pour les fichier(img) => Le controller de sauce pour creer la sauce
router.post("/", auth, multer, sauceCtrl.createSauce);
// Mettre à jour une sauce existante
// Depuis une :id => passe par l'Authentification pour identifier l'user => Multer pour les fichier(img) => Le controller de sauce pour modifier la sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
// Supprimer une sauce
// Depuis une :id => passe par l'Authentification pour identifier l'user => Multer pour les fichier(img) => Le controller de sauce pour supprimer la sauce
router.delete("/:id", auth, multer, sauceCtrl.deleteSauce);
// Récupération d'une sauce spécifique
// Depuis une :id => passe par l'Authentification pour identifier l'user => Le controller de sauce pour l'affichage des données correspondant à l'id
router.get("/:id", auth, sauceCtrl.getOneSauce);
// Renvoie toutes les sauces
// Depuis la racine => passe par l'Authentification pour identifier l'user => Le controller de sauce pour l'affichage des données correspondant à toute les sauces
router.get("/", auth, sauceCtrl.getAllSauces);
// Like ou Dislike
// Depuis une :id => passe par l'Authentification pour identifier l'user => Le controller de sauce pour la permession du like ou dislike
router.post("/:id/like", auth, sauceCtrl.likeOrNot);

module.exports = router;
