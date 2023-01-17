//Importation de jsonwebtoken pour la distribution de token d'identification
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Verification de l'authentification
module.exports = (req, res, next) => {
  try {
    // récupération du token
    // et split (diviser la chaîne de caratère en un tablaeau autour de l'espace qui se trouve entre notre mot clé bearer et token))
    const token = req.headers.authorization.split(" ")[1];
    // Recupère le token depuis l'environement
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
