const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

// Ruta de bienvenida
router.get('/', (req, res) => res.send('Welcome'));

// Ruta para crear un usuario
router.post('/users', controllers.createUser);

// Ruta para obtener todos los usuarios
router.get('/users', controllers.getAllUsers);

module.exports = router;
