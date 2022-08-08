const passwordValidator = require("password-validator");

module.exports = (req, res, next) => {
  const passwordSchema = new passwordValidator()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .uppercase(1, "Le mot de passe doit contenir au moins une majuscule")
    .lowercase(1, "Le mot de passe doit contenir au moins une minuscule")
    .digits(1, "Le mot de passe doit contenir au moins 1 chiffres")
    .symbols(1, "Le mot de passe doit contenir au moins un caractère spécial")
    .not()
    .spaces(0, "Le mot de passe NE doit PAS contenir d'espaces");

  console.log(passwordSchema.validate(req.body, { list: true }));
};
