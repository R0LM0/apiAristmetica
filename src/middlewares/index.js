import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet'; // Añadido para seguridad

// Definir __filename y __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de middleware común
const setupMiddleware = (app) => {
    // Seguridad básica con helmet
    app.use(helmet());

    // Configurar CORS con opciones más restrictivas
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Logging
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

    // Parseo de JSON con límites
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));

    // Archivos estáticos
    app.use('/Docs', express.static(path.join(path.dirname(__dirname), 'Docs')));

    // Middleware para manejo de errores
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            error: process.env.NODE_ENV === 'production' ? 'Error interno del servidor' : err.message
        });
    });
};

export default setupMiddleware;
