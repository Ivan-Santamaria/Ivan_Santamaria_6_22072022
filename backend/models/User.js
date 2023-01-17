// Importation de mongoose pour la communiaction avec la BDD
const mongoose = require("mongoose");

// Importation d'unique-validator pour empecher de créer plusieurs comptes avec un même mail
const uniqueValidator = require("mongoose-unique-validator");

// Constuction du Schéma requis pour inscription et identification
let userSchema = mongoose.Schema({
  //  L'email peut pas être utilisé pour plusieurs création de comptess
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Uitisation du plugin mongoose-unique-validator sur le schéma d'utilisateur
userSchema.plugin(uniqueValidator);

// Exportation du schéma d'utilsateur
module.exports = mongoose.model("User", userSchema);
