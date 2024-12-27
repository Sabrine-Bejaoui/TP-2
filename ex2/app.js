const express = require('express');
const app = express();

// Middleware pour vérifier les champs username et password
app.use(express.json()); // Pour pouvoir accéder à req.body

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  // Vérifier si les champs sont présents
  if (!username || !password) {
    return res.status(400).send('Erreur : les champs "username" et "password" sont requis.');
  }

  next(); // Si les champs sont valides, passe au middleware suivant
});

// Exemple de route pour tester
app.post('/login', (req, res) => {
  res.send('Login réussi !');
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
