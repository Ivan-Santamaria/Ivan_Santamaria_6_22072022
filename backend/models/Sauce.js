// Importation de mongoose pour la communiaction avec la BDD
const mongoose = require("mongoose");

// Creation schema de donnée
// Modèle de donnée qui permet d'enregistrer, lire et modifier les objets qui sont dans la base de donnée
const sauceSchema = mongoose.Schema({
  //  L'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
  userId: { type: String, required: true },
  // Nom de la sauce => Requis
  name: { type: String, required: true },
  // Fabricant de la sauce => Requis
  manufacturer: { type: String, required: true },
  // Description de la sauce => Requis
  description: { type: String, required: true },
  // Le principal ingrédient épicé de la sauce => Requis
  mainPepper: { type: String, required: true },
  // L'URL de l'image de la sauce téléchargée par l'utilisateur => Requis
  imageUrl: { type: String, required: true },
  // Nombre entre 1 et 10 décrivant la sauce => Requis
  heat: { type: Number, required: true },
  // Nombre d'utilisateurs qui aiment (= likent) la sauce => Requis
  likes: { type: Number, required: false },
  // nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce => Non Requis
  dislikes: { type: Number, required: false },
  // tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce => Non Requis
  usersLiked: { type: Array, required: false },
  // tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce => Non Requis
  usersDisliked: { type: Array, required: false },
});

module.exports = mongoose.model("sauce", sauceSchema);
