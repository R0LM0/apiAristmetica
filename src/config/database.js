import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: 5432,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // importante para Render
            },
        },
        logging: false,
        // Configuración de pool para optimizar conexiones
        pool: {
            max: 20, // máximo de conexiones en el pool
            min: 5,  // mínimo de conexiones en el pool
            acquire: 30000, // tiempo máximo para adquirir conexión (30s)
            idle: 10000, // tiempo máximo que una conexión puede estar inactiva (10s)
        },
        // Configuración de timeouts
        retry: {
            max: 3, // máximo de reintentos
            timeout: 5000, // timeout por intento (5s)
        },
        // Configuración de consultas
        query: {
            raw: false, // mantener objetos Sequelize
        },
    }
);

export default sequelize;
