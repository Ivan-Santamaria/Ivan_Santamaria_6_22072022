// Importation de validator
const emailValidator = require("validator");

// Utilisation du validateur .isEmail de la bibliothèque validator
module.exports = (req, res, next) => {
  const { email } = req.body;

  if (emailValidator.isEmail(email)) {
    next();
  } else {
    return res.status(400).json({ error: `L'email ${email} n'est pas valide` });
  }
};
