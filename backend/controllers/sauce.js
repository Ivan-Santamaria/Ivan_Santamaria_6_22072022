// Importation du models sauce.js
const Sauce = require("../models/Sauce");
// Importation du module file system permet de créer et gérer des fichiers pour y stocker ou lire des fichiers dans un programme Node
const fs = require("fs");

// Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  delete sauceObject._id;
  // Creation d'une nouvelle instance du modèle Sauce
  const sauce = new Sauce({
    // ... => Utilisation du spread operator pour copier la variable et la modifier sans toucher à l'originale
    ...sauceObject,
    // Génère url de l'image
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: "",
    usersDisliked: "",
  });
  sauce
    // Enregistre dans la db l'objet et renvoie une promesse
    .save()
    .then(() =>
      res.status(201).json({
        message:
          "Nouvelle sauce enregistrée avec succès! Merci pour vôtre contribution.",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error:
          "Une erreur s'est produite empechant la sauvegarde le la sauce. Veuillez réessayer",
      })
    );
};

// Modifierr la sauce
exports.modifySauce = (req, res, next) => {
  // Recup sauce avec id
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId !== req.auth.userId) {
        // Si L'id ne correspond pas => Non autorisé
        return res.status(404).json({
          error: "Vous n'avez pas la permission de modifier cette sauce!",
        });
      } else {
        // Enregistrement ancienne imgUrl (si nouvelle image dans modify)
        const oldUrl = sauce.imageUrl;
        // Recuperation nom de l'image
        const filename = sauce.imageUrl.split("/images/")[1];
        // Suppression de l'image dans le dossier local
        if (req.file) {
          fs.unlink(`images/${filename}`, () => {
            const sauceObject = {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            };
            // Modification sauce
            Sauce.updateOne(
              { _id: req.params.id },
              { ...sauceObject, _id: req.params.id }
            )
              .then(() =>
                res.status(200).json({ message: "Image modifiée avec succès!" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          const newItem = req.body;
          newItem.imageUrl = oldUrl;
          Sauce.updateOne(
            { _id: req.params.id, userId: req.body.userId },
            { ...newItem, imageUrl: oldUrl, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "Sauce modifiée avec succès!" })
            )
            .catch((error) =>
              res.status(400).json({
                error:
                  "Une erreur inattendue s'est produite lors de la mise a jour de la sauce. Veuillez réessayez.",
              })
            );
        }
      }
    })
    .catch((error) =>
      res.status(500).json({
        error: "La sauce n'existe pas ou n'est pas disponible pour le moment. ",
      })
    );
};

// Supprimer la sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // Methode pour trouver une sauce unique
    .then((sauce) => {
      // Recherche de l'Id de l'utilisateur
      if (sauce.userId !== req.auth.userId) {
        // Si L'id ne correspond pas => Non autorisé
        return res.status(404).json({ error: "Non autorisé" });
      } else {
        // Si L'id correspond => Autorise la poursuite de la suppression
        const sauceObject = req.file
          ? {
              ...JSON.parse(req.body.sauce), // Récupération de toutes les infos sur l'objet
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        // Suppression de l'image dans le dossier /images
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "Sauce supprimée avec succès!" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) =>
      res.status(404).json({
        error: "La sauce n'existe pas ou n'est pas disponible pour le moment.",
      })
    );
};

// Recupérer une sauce (id)
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // Methode pour trouver une sauce unique
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(404).json({
        error:
          "La sauce n'existe pas pour le moment. Veuillez réessayer, n'hesitez pas à la créer vous même!",
      })
    );
};

// Récupération des sauces (toutes)
exports.getAllSauces = (req, res, next) => {
  Sauce.find() // Methode renvoie un tableau contenant toutes les sauces dans la base de données
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(404).json({
        error:
          "Aucune sauce n'est disponible pour le moment. Revenez plus tard ou créez en une! ",
      })
    );
};

// Appréciation, un seul like ou dislike par utilisateur
exports.likeOrNot = (req, res) => {
  const like = req.body.like;

  const userId = req.body.userId;

  if (req.auth.userId !== userId) {
    res.status(404).json({
      message: "Utilisateur non autorisé.",
    });
  }

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (like) {
        case -1:
          if (!sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: 1 },
              }
            )
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Dislike ajouté avec succès." });
              })
              .catch((error) => {
                res.status(400).json({
                  message:
                    "Une erreur inattendue s'est produite lors de l'ajout du dislike sur la sauce. Veuillez réessayez.",
                });
              });
          } else {
            res.status(404).json({
              message:
                "Vous avez déjà mit un dislike sur cette sauce, retirez-le pour notez la sauce à nouveau.",
            });
          }

          break;

        case 0:
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $inc: { likes: -1 },
              }
            )
              .then(() => {
                res.status(200).json({ message: "Like retiré avec succès." });
              })
              .catch((error) => {
                res.status(400).json({
                  message:
                    "Une erreur inattendue s'est produite lors de la suppression du like sur la sauce. Veuillez réessayez.",
                });
              });
          } else if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Dislike retiré avec succès." });
              })
              .catch((error) => {
                res.status(400).json({
                  message:
                    "Une erreur inattendue s'est produite lors de la suppression du dislike sur la sauce. Veuillez réessayez.",
                });
              });
          } else {
            res.status(404).json({
              message: "Vous n'avez pas encore mit un dislike sur cette sauce.",
            });
          }

          break;

        case 1:
          if (!sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: 1 },
              }
            )
              .then(() => {
                res.status(200).json({ message: "Like ajouté avec succès." });
              })
              .catch((error) => {
                res.status(400).json({
                  message:
                    "Une erreur inattendue s'est produite lors de l'ajout du like sur la sauce. Veuillez réessayez.",
                });
              });
          } else {
            res.status(404).json({
              message:
                "Vous avez déjà mit un like sur cette sauce, retirez-le pour notez la sauce à nouveau.",
            });
          }

          break;

        default:
          res.status(404).json({
            message:
              "Action non reconnue. Vous essayez d'appliquer une action non disponible. Veuillez réessayez.",
          });

          break;
      }
    })
    .catch((error) => {
      res.status(404).json({
        message:
          "La sauce n'existe pas ou n'est pas disponible pour le moment. Veuillez réessayez.",
      });
    });
};
