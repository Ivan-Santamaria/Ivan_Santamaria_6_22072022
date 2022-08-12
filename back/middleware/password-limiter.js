// Importation du module express-rate-limit
const rateLimit = require("express-rate-limit");

// Etabli les limites de tentaives
// Chaques IP possèdes 5 tentatives toutes les 5 minutes)
const limiter = rateLimit({
  // 5 minutes
  windowMs: 5 * 60 * 1000,
  // 5 tentatives autorisées
  max: 5,
});

// Exportation du limiter
module.exports = { limiter };
