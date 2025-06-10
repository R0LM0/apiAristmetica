import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';

// Definir __filename y __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rate limiting simple (sin dependencia externa)
const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
    const requests = new Map();

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - windowMs;

        // Limpiar requests antiguos
        if (requests.has(ip)) {
            requests.set(ip, requests.get(ip).filter(time => time > windowStart));
        } else {
            requests.set(ip, []);
        }

        const userRequests = requests.get(ip);

        if (userRequests.length >= max) {
            return res.status(429).json({
                error: 'Demasiadas solicitudes. Inténtalo de nuevo más tarde.',
                retryAfter: Math.ceil(windowMs / 1000)
            });
        }

        userRequests.push(now);
        next();
    };
};

// Configuración de middleware común
const setupMiddleware = (app) => {
    // Seguridad básica con helmet
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));

    // Compresión para mejorar rendimiento
    app.use(compression());

    // Rate limiting
    app.use(rateLimit(15 * 60 * 1000, 100)); // 100 requests por 15 minutos

    // Configurar CORS con opciones más restrictivas
    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
        : ['http://localhost:3000', 'http://localhost:8080'];

    app.use(cors({
        origin: function (origin, callback) {
            // Permitir requests sin origin (como mobile apps)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('No permitido por CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true,
        maxAge: 86400, // 24 horas
    }));

    // Logging mejorado
    const logFormat = process.env.NODE_ENV === 'production'
        ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
        : 'dev';

    app.use(morgan(logFormat, {
        skip: (req, res) => res.statusCode < 400, // Solo log de errores en producción
    }));

    // Parseo de JSON con límites y validación
    app.use(express.json({
        limit: '1mb',
        verify: (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch (e) {
                res.status(400).json({ error: 'JSON inválido' });
                throw new Error('JSON inválido');
            }
        }
    }));

    app.use(express.urlencoded({
        extended: true,
        limit: '1mb',
        parameterLimit: 100, // máximo 100 parámetros
    }));

    // Archivos estáticos con cache
    app.use('/Docs', express.static(path.join(path.dirname(__dirname), 'Docs'), {
        maxAge: '1d', // Cache por 1 día
        etag: true,
    }));

    // Middleware para manejo de errores mejorado
    app.use((err, req, res, next) => {
        console.error('Error en middleware:', err.stack);

        // No exponer detalles del error en producción
        const errorMessage = process.env.NODE_ENV === 'production'
            ? 'Error interno del servidor'
            : err.message;

        res.status(err.status || 500).json({
            error: errorMessage,
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
        });
    });
};

export default setupMiddleware;
