const express = require('express');
const app = express();

// Middleware pour logger les informations des requêtes
app.use((req, res, next) => {
  const date = new Date();
  console.log(`[${date.toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // Passe au middleware suivant
});

// Exemple de route pour tester
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
