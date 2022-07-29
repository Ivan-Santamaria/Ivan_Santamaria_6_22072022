const mongoose = require("mongoose");

// Importation d'unique-validator pour empecher de créer plusieurs comptes avec un même mail
const uniqueValidator = require("mongoose-unique-validator");

// Constuction du Schéma requis pour inscription et identification
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
