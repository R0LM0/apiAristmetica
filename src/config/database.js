import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Crear una nueva instancia de Sequelize sin llamar a sync()
const sequelize = new Sequelize(
    process.env.DB_NAME,        // Nombre de la base de datos
    process.env.DB_USER,        // Usuario de la base de datos
    process.env.DB_PASSWORD,    // Contraseña de la base de datos
    {
        host: process.env.DB_HOST,   // Host
        dialect: 'postgres',         // Dialecto de base de datos
        logging: false,              // Desactivar logging si lo prefieres
    }
);

export default sequelize;
