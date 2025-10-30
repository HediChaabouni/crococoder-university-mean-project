# 🏫 Crococoder University – MEAN Project  

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-Active-success)

> Projet pédagogique complet basé sur la stack **MEAN** (MongoDB, Express, Angular, Node.js).  
> L’application simule une gestion universitaire moderne : courses, classes, evals, teachers, students, parents et admins, avec dashboards dynamiques et système d’authentification.

---

## 🚀 Stack technique

- **Frontend :** Angular 17+  
- **Backend :** Node.js + Express  
- **Base de données :** MongoDB (via Mongoose)  
- **Autres :**  
  - Bootstrap 4  
  - AOS / Animate / OwlCarousel  
  - Pipes, Guards, Routing Angular  
  - Uploads statiques avec Express  

---

## 📁 Structure du projet

university/
│
├── backend/ # API Node.js + Express + MongoDB
│ ├── controllers/ # Logique métier
│ ├── models/ # Schémas Mongoose
│ ├── routes/ # Routes REST
│ ├── uploads/ # Dossier public pour fichiers uploadés
│ ├── app.js # Configuration principale Express
│ ├── server.js # Point d’entrée du serveur
│ └── package.json
│
├── frontend/ # Application Angular (SPA)
│ ├── src/
│ │ ├── app/ # Composants, services, guards, pipes
│ │ ├── assets/ # Images, CSS, JS, polices
│ │ ├── environments/ # Configurations API
│ │ └── index.html
│ ├── angular.json
│ └── package.json
│
├── university_env.json # Variables d’environnement
├── university_full_api_complete.postman_collection.json # Collection Postman
└── README.md

yaml
Copier le code

---

## ⚙️ Installation & exécution

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/HediChaabouni/crococoder-university-mean-project.git
cd crococoder-university-mean-project
2️⃣ Installer les dépendances
Backend :

bash
Copier le code
cd backend
npm install
Frontend :

bash
Copier le code
cd ../frontend
npm install
3️⃣ Lancer les serveurs
Backend (port 5000) :

bash
Copier le code
npm start
Frontend (port 4200 ou 4220) :

bash
Copier le code
npm start
🌐 Accès à l’application
Composant	URL par défaut	Description
Frontend Angular	http://localhost:4200/	Application principale
Backend API	http://localhost:5000/api	Endpoints REST JSON
Uploads publics	http://localhost:5000/uploads/	Dossier d’images accessibles

👥 Rôles & Dashboards
Rôle	Accès principal	Description
🧑‍💼 Admin	/admin-dashboard	Gestion des classes, cours, utilisateurs et statistiques
👩‍🏫 Teacher	/teacher-dashboard	Gestion des cours et évaluations
👨‍🎓 Student	/student-dashboard	Suivi des cours et résultats
👨‍👩‍👧 Parent	/parent-dashboard	Suivi des enfants et bulletins

📊 Fonctionnalités clés
✅ Authentification multi-profils (Admin / Teacher / Student / Parent)
✅ Gestion CRUD des utilisateurs, cours, classes et évaluations
✅ Dashboards dynamiques avec statistiques animées
✅ Animation des compteurs via Pipe personnalisé (countUp)
✅ Système d’images : upload ou URL directe dans les cours
✅ Responsive design (Bootstrap + CSS custom)

🧩 API principale (exemples)
Méthode	Endpoint	Description
GET	/api/admin/stats	Récupère les statistiques globales
GET	/api/courses	Liste des cours
POST	/api/users/signup	Inscription
POST	/api/users/login	Connexion
POST	/api/evals	Création d’une évaluation

📦 Variables d’environnement
Fichier : backend/.env ou university_env.json

bash
Copier le code
MONGO_URI=mongodb://localhost:27017/universityDB
PORT=5000
JWT_SECRET=yourSecretKey
🧑‍💻 Auteur
👨‍🏫 Hedi Chaabouni
📍 Ingénieur/MBA/Développeur – Pilotage de projets logiciels
💼 Expérience : industrie, infrastructures, finance, qualité, digital 
🌐 GitHub – HediChaabouni

📅 Dernière mise à jour
Octobre 2025
© Crococoder University Project – Tous droits réservés.
