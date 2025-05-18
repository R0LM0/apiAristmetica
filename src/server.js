import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

import sequelize from './config/database.js';
import setupApiRoutes from './routes/api.js';
import setupMiddleware from './middlewares/index.js';
import routes from './routes/index.js';

// Cargar variables de entorno
dotenv.config();


// Inicializar Express
const app = express();
const port = process.env.PORT || 4000;


// Crear servidor HTTP
const server = createServer(app);

// Configurar middleware
setupMiddleware(app);

// Configurar rutas API
setupApiRoutes(app, routes);


// Probar conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

// Iniciar servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);

    // // Programar limpieza de tokens expirados
    // scheduleTokenCleanup();
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
});

export default server; // Para pruebas