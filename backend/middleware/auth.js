//Importation de jsonwebtoken pour la distribution de token d'identification
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

/* Verification authentification */
module.exports = (req, res, next) => {
  try {
    // récupération du token
    // et split (diviser la chaîne de caratère en un tablaeau autour de l'espace qui se trouve entre notre mot clé bearer et token))
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      // Si le token et l'userdId ne correspondent pas => Erreur
      throw "User ID Invalide";
    } else {
      // Si le token et l'userdId correspondent => Continuer
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête Invalide!"),
    });
  }
};
