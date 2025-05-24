import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const userAnswer = sequelize.define('user_answers', {
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
    question: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    given_answer: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    answered_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'user_answers',
    schema: 'public',
    timestamps: false
});

export default userAnswer;
