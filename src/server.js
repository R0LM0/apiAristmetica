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

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // Probar conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión exitosa a la base de datos');

        // Iniciar servidor
        server.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
            console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
        });

        // Manejar errores del servidor
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Error: El puerto ${port} ya está en uso`);
                console.error('💡 Solución: Termina el proceso que usa el puerto o cambia el puerto en .env');
                process.exit(1);
            } else {
                console.error('❌ Error del servidor:', error);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

// Manejo de errores no capturados (mejorado)
process.on('uncaughtException', (error) => {
    console.error('💥 Error no capturado:', error.message);
    console.error('📍 Stack trace:', error.stack);

    // En producción, cerrar el servidor de forma limpia
    if (process.env.NODE_ENV === 'production') {
        server.close(() => {
            console.log('🔒 Servidor cerrado debido a error no capturado');
            process.exit(1);
        });
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Promesa rechazada no manejada:', reason);
    console.error('📍 Promise:', promise);

    // En producción, cerrar el servidor de forma limpia
    if (process.env.NODE_ENV === 'production') {
        server.close(() => {
            console.log('🔒 Servidor cerrado debido a promesa rechazada');
            process.exit(1);
        });
    }
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
    console.log('📡 Recibida señal SIGTERM, cerrando servidor...');
    server.close(() => {
        console.log('🔒 Servidor cerrado');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('📡 Recibida señal SIGINT, cerrando servidor...');
    server.close(() => {
        console.log('🔒 Servidor cerrado');
        process.exit(0);
    });
});

// Iniciar el servidor
startServer();

export default server; // Para pruebas