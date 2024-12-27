const express = require('express');
const app = express();

// Middleware pour vérifier l'âge
app.use(express.json()); // Pour pouvoir accéder à req.body

function validateAge(req, res, next) {
  const { age } = req.body;

  // Vérifier si le champ age est présent et négatif
  if (age !== undefined && age < 0) {
    const error = new Error('L\'âge ne peut pas être négatif.');
    error.status = 400;
    return next(error); // Passer l'erreur au middleware de gestion des erreurs
  }

  next(); // Si l'âge est valide, passe au middleware suivant
}

// Exemple de route POST qui utilise le middleware
app.post('/register', validateAge, (req, res) => {
  res.send('Inscription réussie !');
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(err.message);
  }
  res.status(500).send('Erreur interne du serveur.');
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
