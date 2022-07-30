// Importation d'Express
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const clean = require("xss-clean/lib/xss").clean;

// will return "&lt;script>&lt;/script>"
const cleaned = clean("<script></script>");

// Importation de MongoDB
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

//Importation des variables d'environement
require("dotenv").config();

// Importation des routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

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

// bodyParser déprécié
app.use(express.json());

// Pour éviter l'injection de code dans MongoDB
app.use(mongoSanitize());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
