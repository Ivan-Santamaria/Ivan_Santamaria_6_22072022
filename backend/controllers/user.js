// Importation de bcrypt pour le hachage des mots de passes utilisateurs
const bcrypt = require("bcrypt");
// Importation de jsonwebtoken pour la distribution de token d'identification
const jwt = require("jsonwebtoken");
// Importation du schéma de l'utilisateur
const User = require("../models/User");
// Importation de crypto-js pour le cryptage des e-mails
const cryptojs = require("crypto-js");
// Importation dotenv pour la prise en compte des variable d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// Fonction pour la création d'utilisateurs
exports.signup = (req, res, next) => {
  // Utilisation de crypto-js pour crypter l'adresse mail à la création du profil utilisateur
  const emailCrypt = cryptojs
    .HmacSHA256(req.body.email, `${process.env.SECRET_KEY}`)
    .toString();
  // Utilisation de bcrypt pour saler le password 10 fois
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCrypt,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé! Bienvenue" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction pour la connexion à un compte existant dans la base de donnée
exports.login = (req, res, next) => {
  // Utilisation de crypto-js pour récupérer l'adresse mail cryptée de l'utilisateur
  const emailCrypt = cryptojs
    .HmacSHA256(req.body.email, `${process.env.SECRET_KEY}`)
    .toString();
  User.findOne({ email: emailCrypt })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Utilisateur non trouvé!Veuillez réessayer." });
      }
      // Utilisation de bcrypt pour comparer les données de la BDD avec la saisi de l'utilisateur
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // En cas de non correspondance l'utilisateur se verra refuser l'acces
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Mot de passe incorrect! Veuillez réessayer." });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error:
              "Une erreur inattendue s'est produite lors de la vérification du mot de passe. Veuillez réessayer.",
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error:
          "Une erreur inattendue s'est produite lors de la rechercher de l'utilisateur. Veuillez réessayer.",
      })
    );
};
