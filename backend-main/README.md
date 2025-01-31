
# Documentation de l'API Backend

## Vue d'ensemble

Cette API est conçue pour une application web permettant aux étudiants de s'inscrire, de sélectionner des superviseurs et maîtres, et de fournir des évaluations. L'API comprend des endpoints pour **l'authentification**, **l'inscription**, **l'attribution des encadreurs**, **l'évaluation**, et **la liste des encadreurs avec les évaluations moyennes**.

### URL de Base
```
http://localhost:8000/api/
```

---

## Authentification et Gestion des Utilisateurs

### 1. `POST /login/` – Connexion de l'utilisateur

Authentifie l'utilisateur avec un nom d'utilisateur et un mot de passe.

- **Corps de la Requête** :
  ```json
  {
    "username": "user",
    "password": "password123"
  }
  ```

- **Réponse** (Succès) :
  ```json
  {
    "message": "Connexion réussie",
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- **Réponse** (Erreur) :
  ```json
  {
    "error": "Identifiants invalides"
  }
  ```

### 2. `POST /register/` – Inscription de l'utilisateur

Crée un nouvel utilisateur et lui assigne un profil étudiant.

- **Corps de la Requête** :
  ```json
  {
    "username": "nouvelutilisateur",
    "email": "nouvelutilisateur@example.com",
    "password": "nouveaumotdepasse123",
    "first_name": "Nouveau",
    "last_name": "Utilisateur"
  }
  ```

- **Réponse** (Succès) :
  ```json
  {
    "message": "Inscription réussie",
    "user_id": 2,
    "student_id": 2
  }
  ```

- **Réponse** (Erreur, ex: nom d'utilisateur existe déjà) :
  ```json
  {
    "error": "Le nom d'utilisateur existe déjà"
  }
  ```

---

## Attribution et Liste des Encadreurs

### 3. `POST /choose-encadreur/` – Choisir un Superviseur et un Maître

Permet à un étudiant de choisir un maître et un superviseur. La logique du backend empêche d'assigner un maître à plusieurs étudiants et limite les superviseurs à trois étudiants. La disponibilité est réglée sur `False` lorsque la capacité est atteinte.

- **Corps de la Requête** :
  ```json
  {
    "user_id": 1,
    "supervisor_id": 2,
    "master_id": 3
  }
  ```

- **Réponse** (Succès) :
  ```json
  {
    "message": "Encadreur choisi avec succès !"
  }
  ```

- **Réponse** (Erreur: Maître déjà assigné) :
  ```json
  {
    "error": "Ce maître est déjà assigné à un autre étudiant."
  }
  ```

- **Réponse** (Erreur: Superviseur à capacité maximale) :
  ```json
  {
    "error": "Ce superviseur est déjà assigné au nombre maximal d'étudiants."
  }
  ```

---

## Évaluation des Encadreurs

### 4. `POST /rate-encadreur/` – Évaluer un Superviseur

Permet à un étudiant de soumettre une évaluation pour un superviseur.

- **Corps de la Requête** :
  ```json
  {
    "user_id": 1,
    "encadreur_id": 2,
    "rating": 4.5
  }
  ```

- **Réponse** (Succès) :
  ```json
  {
    "message": "Évaluation soumise avec succès !"
  }
  ```

- **Réponse** (Erreur) :
  ```json
  {
    "error": "Méthode POST requise"
  }
  ```

### 5. `POST /rate-master/` – Évaluer un Maître

Permet à un étudiant de soumettre une évaluation pour un maître.

- **Corps de la Requête** :
  ```json
  {
    "user_id": 1,
    "master_id": 3,
    "rating": 4
  }
  ```

- **Réponse** (Succès) :
  ```json
  {
    "message": "Évaluation du maître soumise avec succès !"
  }
  ```

- **Réponse** (Erreur) :
  ```json
  {
    "error": "Méthode POST requise"
  }
  ```

---

## Liste des Encadreurs avec les Évaluations Moyennes

### 6. `GET /supervisors/` – Lister les Superviseurs avec les Évaluations Moyennes

Liste tous les superviseurs avec leurs évaluations moyennes.

- **Réponse** :
  ```json
  [
    {
      "id": 1,
      "name": "Dr. Smith",
      "specialty": "Machine Learning",
      "available": true,
      "average_rating": 4.2
    },
    {
      "id": 2,
      "name": "Dr. Jones",
      "specialty": "Data Science",
      "available": false,
      "average_rating": 3.8
    }
  ]
  ```

### 7. `GET /masters/` – Lister les Maîtres avec les Évaluations Moyennes

Liste tous les maîtres avec leurs évaluations moyennes.

- **Réponse** :
  ```json
  [
    {
      "id": 1,
      "name": "Prof. Green",
      "specialty": "Ingénierie Logicielle",
      "available": true,
      "average_rating": 4.7
    },
    {
      "id": 2,
      "name": "Prof. Brown",
      "specialty": "Cybersécurité",
      "available": false,
      "average_rating": 4.5
    }
  ]
  ```

---

## Notes et Exemples pour les Tests

1. **Connexion et Gestion de Session** :
   - Pour utiliser les autres endpoints nécessitant un utilisateur connecté, obtenez d'abord un token de session via le endpoint de connexion.
   - Utilisez des outils comme `httpie` ou `Postman` pour les tests.

2. **Exemples de Commandes de Test** :
   - Connexion :
     ```bash
     http POST http://localhost:8000/api/login/ username="boss" password="password123"
     ```
   - Choisir un Encadreur :
     ```bash
     http POST http://localhost:8000/api/choose-encadreur/ user_id=1 supervisor_id=2 master_id=3
     ```

3. **Commandes d'Évaluation** :
   - Évaluer un Superviseur :
     ```bash
     http POST http://localhost:8000/api/rate-encadreur/ user_id=1 encadreur_id=2 rating=4.5
     ```
   - Évaluer un Maître :
     ```bash
     http POST http://localhost:8000/api/rate-master/ user_id=1 master_id=3 rating=4
     ```

4. **Commandes de Liste** :
   - Liste des Superviseurs avec les Évaluations :
     ```bash
     http GET http://localhost:8000/api/supervisors/
     ```
   - Liste des Maîtres avec les Évaluations :
     ```bash
     http GET http://localhost:8000/api/masters/
     ```

---

Cette documentation fournit des détails d'utilisation pour chaque endpoint, des exemples pour les tests, et les réponses attendues.
