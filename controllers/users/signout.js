// Dans votre fichier de routes (userRoute.js)

const express = require('express');
const router = express.Router();

// Endpoint de déconnexion
router.get('/signout', (req, res) => {
  // Effectuez les opérations de déconnexion ici, telles que la suppression des cookies, la suppression du JWT, etc.
  // Vous pouvez également envoyer une réponse JSON appropriée pour indiquer que la déconnexion a réussi.
  res.json({ message: 'Logout successful' });
});

module.exports = router;
