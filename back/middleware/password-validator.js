//// Importaion du module password-validator
const passwordValidator = require("password-validator");
//
//
//
//// Creation d'un schéma
const passwordSchema = new passwordValidator()
  .is()
  .min(8, ["8 caractères minimum"])
  .is()
  .max(25, "25 caractères maximum")
  .has()
  .uppercase([1], "Doit contenir au moins une minuscule")
  .has()
  .lowercase([1], "Doit contenir une minuscule minimum")
  .has()
  .digits([1], "Doit contenir un chiffre minimum")
  .has()
  .not()
  .spaces(false, "Ne doit contenir aucun espace")
  .is()
  .not()
  .oneOf(
    ["Passw0rd", "Password123", "Qwerty123", "Azerty123"],
    "Mot de passe interdit"
  );
//
//
//
//// Exportation du schéma de mot de passe
////// Si t'utilisateurs respecte les contidtions alors sont compte sera enregistré sur la BDD
////// Sinon sont mot de passe sera refusé
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error:
        "Mot de passe invalide!" +
        passwordSchema.validate(req.body.password, { details: true }),
    });
  }
};
