# Mission

Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .

![PIIQUANTE](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)

Piiquante : Marque de sauces piquantes

Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

Le délai est raisonnable, vous décidez donc d'accepter le projet. Après avoir rencontré Paula, la cheffe de produit de Piiquante, elle vous envoie l’email suivant :

---

## Consigne

Bonjour,

Nous sommes ravis que vous contribuiez à cette nouvelle application web ! Nous sommes une petite marque, donc ce projet aura un impact important sur notre croissance.

Vous trouverez ci-joint les spécifications pour l'API. Vous pouvez également trouver [un lien vers le repo du projet ici](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) où vous aurez accès à l'interface.

Merci de faire particulièrement attention aux exigences en matière de sécurité. Nous avons récemment été victimes d'attaques sur notre site web et nous voulons être sûrs que l'API de cette application est construite selon des pratiques de code sécurisées. Tous les mots de passe des utilisateurs recueillis par l'application doivent être protégés !

Cordialement,

Paula Z
Cheffe de produit
Piiquante

Pièce jointe :

[Requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf)

---

## Compétences évaluées

- Mettre en œuvre des opérations CRUD de manière sécurisée
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée

# Déploiement

## Pré-Requis

Vous devez disposer de:

- NODE
- NPM

### Cloner le projet

- Depuis un terminal utilisez la commande: git clone https://github.com/Ivan-Santamaria/Ivan_Santamaria_6_22072022.git afin de récuperer le projet

### Installation des dépendances

- Positionnez vous à la racine du projet avec la commande: `cd Ivan_Santamaria_6_22072022/`
- (Optionnel) Si vous utilisez VScode utilisez la commande: `code . `

#### Pour l'étape suivante vous aurez besoin de deux terminaux

- Positionnez le premier terminal sur le dossier back avec la commande: `cd back`
- Lancez la comande: `npm install`
- Positionnez le second terminal sur le dossier front avec la commande: `cd front`
- Lancer la comande: `npm install`

### Configurer le fichier environnement

- Configurer le fichier d'environnement `.env` à partir d’un fichier d'exemple `.env.example`

### Démarrez le serveur backend & connexion à la base de données

- Depuis le dossier back lancez la commande: `nodemon server`
- Si tout c'est bien passé vous devriez apercevoir le message suivant dans vôtre terminal:
  [nodemon] starting `node server.js`  
  Listening on port 3000  
  Connexion à MongoDB réussie !

### Démarrez l'interface utilisateur

- Depuis le dossier front lancez la commande: `npm run start`
- Le message: `✔ Compiled successfully` apparait dans la console pour vous signifier du bon déroulement de l'opération

### Accès au portail d'identification

- Depuis un navigateur internet:
- Inscrivez dans la barre Url: `http://localhost:4200/`
