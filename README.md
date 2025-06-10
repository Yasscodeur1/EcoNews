# EcoNews

# 📰 Projet Final – EcoNews 🌍 (Laravel 12 + React 19 + Inertia.js)

## 🎯 Objectif

Développer une application web de publication d’actualités sur le thème de votre choix (ex : sport, tech, musique, politique, etc.).

Le site utilise les technologies suivantes :

- ✅ Laravel 12
- ✅ React 19
- ✅ Inertia.js
- ✅ TailwindCSS
- ✅ MySQL
- ✅ Mailtrap (ou autre SMTP)
- ✅ Git + GitHub

---

## 📦 Fonctionnalités principales

### 🔐 Authentification & Rôles

- Connexion, inscription, déconnexion
- Middleware de rôles :
  - **Lecteur** : lire, commenter, liker
  - **Auteur** : créer/éditer/supprimer ses articles
  - **Webmaster** : gérer tout le contenu (articles, catégories, tags), envoyer des newsletters
  - **Admin** : gérer tous les utilisateurs, rôles et statistiques

### 📄 Gestion de contenu

- Création et édition d’articles
- Association d’**articles** à des **catégories** (Many-to-One)
- Gestion des **tags** (Many-to-Many)
- Commentaires liés aux utilisateurs
- Likes / Votes
- Recherche multi-critères (titre, contenu, catégorie, tag)

### 📬 Mailing

- Email de confirmation d’inscription
- Notification automatique lors de la publication d’un nouvel article
- Envoi manuel de **newsletters**

### 🧑‍💻 Interface administrateur

- Tableau de bord
- Gestion des utilisateurs et des rôles
- CRUD complet des articles, catégories, tags
- Envoi de newsletters
- Statistiques de base (nombre d'utilisateurs, articles, etc.)

---

## 🗃️ Arborescence du projet

