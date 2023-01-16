// Importation d'Express
const express = require("express");
// Déclaration des chemin de stockage
const path = require("path");
// Importation du module helet pour proteger les en-têtes
const helmet = require("helmet");
// Important de xss clean
const xss = require("xss-clean");
const clean = require("xss-clean/lib/xss").clean;
// will return "&lt;script>&lt;/script>"
const cleaned = clean("<script></script>");
// Importation de MongoDB
const mongoose = require("mongoose");
// IMportation de mongo-sanitize pour des envoi vers la BDD
const mongoSanitize = require("express-mongo-sanitize");
//Importation des variables d'environement
const dotenv = require("dotenv");
const result = dotenv.config();
require("dotenv").config();
// Importation des routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const swaggerUi = require("swagger-ui-express");

// Connexion vers MongoDB en récupérant les données dans le fichiers .env
mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Creation application express
const app = express();

// Permet l'utilisation d'Helmet tout en partageant les ressources (erreur: CORS)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    // ...
  })
);

app.use(xss());

// Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  // Même principe de crossOriginResourcePolicy: false, sur helmet
  //res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

// bodyParser déprécié, utilisation de express.json suffisante
app.use(express.json());

// Pour éviter l'injection de code dans MongoDB
app.use(mongoSanitize());

// Envoi des images vers le repertoire de stockage (images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
