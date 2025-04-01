const cors = require('cors');
const express = require('express');
const routes = require('../routes');

const server = express();

// Habilitar CORS para todas las rutas
server.use(cors());
server.options('*', cors());

// Middleware para parsear el cuerpo de las solicitudes como JSON
server.use(express.json());

// Usar las rutas definidas en el archivo routes.js bajo el prefijo /api
server.use('/api', routes);

// Exportar el servidor para su uso en otros archivos
module.exports = server;
