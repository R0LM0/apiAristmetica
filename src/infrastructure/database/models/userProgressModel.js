import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const UserProgress = sequelize.define('user_progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    operation_level_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'operation_levels',
            key: 'id'
        }
    },
    current_level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'user_progress',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'operation_level_id']
        }
    ]
});

export default UserProgress;
