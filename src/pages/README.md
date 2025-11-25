# Dashboard Personnel - Météo & Tâches

Bienvenue sur le Dashboard Personnel ! Cette application web, développée avec React et TypeScript, vous permet de créer un espace personnalisé pour gérer vos tâches quotidiennes et suivre la météo de vos villes préférées.

## ✨ Fonctionnalités

### Authentification
- **Inscription & Connexion** : Créez un compte utilisateur (prénom, nom, email, mot de passe) ou connectez-vous à un compte existant.
- **Persistance de session** : L'état de connexion est conservé, vous n'avez pas besoin de vous reconnecter à chaque visite.
- **Données personnalisées** : Toutes vos tâches et villes sont sauvegardées de manière unique pour votre compte en utilisant le `localStorage`.

### 🛡️ Routes Protégées
- L'accès aux pages principales (Dashboard, Tâches, Météo) est réservé aux utilisateurs connectés.
- Les utilisateurs non connectés sont automatiquement redirigés vers la page de connexion.

### 🏠 Dashboard
- **Vue d'ensemble centralisée** : La page d'accueil affiche un résumé de vos informations les plus importantes.
- **Widgets Météo** : Affiche un aperçu de la météo pour chaque ville que vous avez enregistrée.
- **Aperçu des Tâches** : Liste vos prochaines tâches pour une consultation rapide.
- **Navigation intuitive** : Cliquez sur un widget météo ou une tâche pour être redirigé vers la page détaillée correspondante.

### 🌦️ Page Météo
- **Multi-villes** : Recherchez et ajoutez jusqu'à 4 villes pour suivre leur météo simultanément.
- **Données détaillées** : Affiche la température, l'humidité, la vitesse du vent et une icône représentative du temps.
- **Gestion simple** : Ajoutez ou supprimez des villes facilement.
- **Sauvegarde automatique** : Vos villes sont sauvegardées et rechargées automatiquement à chaque visite.

### ✅ Page Tâches
- **Gestion complète (CRUD)** : Créez, lisez, modifiez et supprimez vos tâches.
- **Formulaire intelligent** : Les données que vous saisissez dans le formulaire sont sauvegardées en temps réel pour éviter toute perte en cas de rafraîchissement de la page.
- **Interface claire** : Visualisez vos tâches dans une liste organisée avec des options d'édition et de suppression.

## 🛠️ Technologies utilisées

- **React** (avec Vite)
- **TypeScript** pour un code robuste et typé
- **React Router DOM** pour la navigation et le routage
- **React Context API** pour la gestion globale de l'état d'authentification
- **CSS Modules** pour le style des composants
- **OpenWeatherMap API** pour les données météorologiques

## 🚀 Installation et Lancement

Suivez ces étapes pour lancer le projet en local :

1.  **Clonez le dépôt**
    ```bash
    git clone <url-du-depot>
    cd <nom-du-dossier>
    ```

2.  **Installez les dépendances**
    ```bash
    npm install
    ```

3.  **Lancez le serveur de développement**
    ```bash
    npm run dev
    ```

4.  Ouvrez votre navigateur et allez à l'adresse `http://localhost:5173` (ou l'adresse indiquée dans votre terminal).

## ⚙️ Fonctionnement interne

### Gestion de l'état
- **Contexte d'authentification (`AuthContext`)** : Un contexte React a été mis en place pour fournir l'état de l'utilisateur (`user`, `login`, `logout`) à l'ensemble de l'application. Cela permet aux composants de réagir instantanément aux changements d'état de connexion et résout les problèmes de navigation.
- **Hooks React** : L'application utilise intensivement les hooks `useState`, `useEffect`, `useContext` et `useCallback` pour gérer l'état local, les effets de bord et les optimisations.

### Persistance des données
- Le **`localStorage`** du navigateur est utilisé pour toute la persistance des données.
- **Données utilisateur** : Une clé `app_users` stocke la liste de tous les utilisateurs inscrits. Une clé `loggedInUser` stocke les informations de l'utilisateur actuellement connecté.
- **Données personnalisées** : Pour s'assurer que chaque utilisateur ne voit que ses propres données, les clés de stockage pour les tâches et les villes sont dynamiquement créées en utilisant l'email de l'utilisateur comme identifiant unique.
  - Clé pour les tâches : `todoPageTasks_user@example.com`
  - Clé pour les villes : `weatherPageCities_user@example.com`

## 📂 Structure des fichiers

```
src
├── components/
│   ├── ProtectedRoute.tsx   # Gère l'accès aux pages protégées
│   └── WeatherWidget.tsx    # Widget météo réutilisable
│
├── context/
│   └── AuthContext.tsx      # Contexte global pour l'authentification
│
├── pages/
│   ├── Dashboard.tsx        # Page d'accueil
│   ├── Headers.tsx          # Barre de navigation et menu latéral
│   ├── LoginPage.tsx        # Page d'inscription et de connexion
│   ├── TodoPage.tsx         # Page de gestion des tâches
│   └── WeatherPage.tsx      # Page de gestion de la météo
│
├── styles/
│   ├── Dashboard.css
│   ├── Headers.css
│   ├── LoginPage.css
│   ├── TodoPageStyle.css
│   ├── WeatherPageStyles.css
│   └── WeatherWidget.css
│
├── App.tsx                  # Routeur principal de l'application
└── main.tsx                 # Point d'entrée de l'application
```

---

Ce projet a été développé dans le but de créer une application web moderne, réactive et personnalisée.