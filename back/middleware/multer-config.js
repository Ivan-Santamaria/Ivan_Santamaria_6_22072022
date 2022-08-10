//// Importation du module multer pour permettre aux utilisateur l'upload de fichier
const multer = require("multer");
//
//
//
//// Création de la bibliothèque de fichiers acceptés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
//
//
//
const storage = multer.diskStorage({
  ////// Indique à multer dans quel dossier engistrer les fichiers
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
//
//
//
//// Exportation de multer et indique qu'on gère uniquement les téléchargements de fichiers image
module.exports = multer({ storage: storage }).single("image");
