require("dotenv").config();
// Importation d'express & Mongoose
const express = require("express");
const mongoose = require("mongoose");

// Importation des routes
const userRoutes = require("./routes/user");

// Connexion vers MongoDB
mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Creation application express
const app = express();

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
  next();
});

// bodyParser déprécié
app.use(express.json());

app.use("/api/auth", userRoutes);

module.exports = app;
