import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const OperationLevel = sequelize.define('operation_levels', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'operation_levels',
    schema: 'public',
    timestamps: false
});

export default OperationLevel;
