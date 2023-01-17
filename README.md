![PIIQUANTE](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)

# Compétences évaluées

- Mettre en œuvre des opérations CRUD de manière sécurisée
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée

# Déploiement

## Pré-Requis

Vous devez disposer de:

- NODE
- NPM

### Cloner le projet

- Depuis un terminal utilisez la commande: git clone https://github.com/Ivan-Santamaria/Ivan_Santamaria_6_22072022.git afin de récupérer le projet

### Installation des dépendances

- Positionnez vous à la racine du projet avec la commande: `cd Ivan_Santamaria_6_22072022/`
- (Optionnel) Si vous utilisez VScode utilisez la commande: `code . `

#### Pour l'étape suivante vous aurez besoin de deux terminaux

- Positionnez le premier terminal sur le dossier backend avec la commande: `cd back`
- Lancez la comande: `npm install`
- Positionnez le second terminal sur le dossier frontend avec la commande: `cd front`
- Lancer la comande: `npm install`

### Configurer le fichier environnement

- Configurer le fichier d'environnement `.env` à partir d’un fichier d'exemple `.env.example`

### Démarrez le serveur backend & connexion à la base de données

- Depuis le dossier backend lancez la commande: `nodemon server`
- Si tout c'est bien passé vous devriez apercevoir le message suivant dans vôtre terminal:
  [nodemon] starting `node server.js`  
  Listening on port 3000  
  Connexion à MongoDB réussie !

### Démarrez l'interface utilisateur

- Depuis le dossier frontend lancez la commande: `npm run start`
- Le message: `✔ Compiled successfully` apparait dans la console pour vous signifier du bon déroulement de l'opération

### Accès au portail d'identification

- Depuis un navigateur internet:
- Inscrivez dans la barre Url: `http://localhost:4200/`

---

# Endpoints Url

- Signup: `localhost:3000/api/auth/signup` (POST)

- Login: `localhost:3000/api/auth/login` (POST)

- Créer une sauce: `localhost:3000/api/sauces` (POST)

- Afficher une Sauce: `localhost:3000/api/sauces/:sauceId` (GET)

- Afficher la liste de sauce : `localhost:3000/api/sauces` (GET)

- Modifier une sauce: `localhost:3000/api/sauces/:sauceId` (PUT)

- Supprimer une sauce: `localhost:3000/api/sauces/:stuffId` (DELETE)

- Like or Dislike a sauce: `localhost:3000/api/sauces/:sauceId/like` (POST)

# Modèles:

## Sauces

- `userId` : `String` — l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce

- `name` : `String` — nom de la sauce

- `manufacturer` : `String` — fabricant de la sauce

- `description` : `String` — description de la sauce

- `mainPepper` : `String` — le principal ingrédient épicé de la sauce

- `imageUrl`: `String` — l'URL de l'image de la sauce téléchargée par l'utilisateur

- `heat` : `Number` — nombre entre 1 et 10 décrivant la sauce

- `likes` : `Number` — nombre d'utilisateurs qui aiment (= likent) la sauce

- `dislikes` : `Number` — nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce

- `usersLiked `: `[ "String <userId>" ]` — tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce

- `usersDisliked` : `[ "String <userId>" ]` — tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce

## Utilisateur

- `email` : `String` — adresse e-mail de l'utilisateur `[unique]`

- `password` : `String` — mot de passe de l'utilisateur haché
