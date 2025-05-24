import User from './user.model.js';
import OperationLevel from './operationLevel.model.js';
import UserProgress from './userProgress.model.js';
import UserAnswer from './userAnswerModel.js';

// Relaciones existentes
User.hasMany(UserProgress, { foreignKey: 'user_id' });
UserProgress.belongsTo(User, { foreignKey: 'user_id' });

OperationLevel.hasMany(UserProgress, { foreignKey: 'operation_level_id' });
UserProgress.belongsTo(OperationLevel, { foreignKey: 'operation_level_id' });

// ➕ Relaciones nuevas para user_answers
User.hasMany(UserAnswer, { foreignKey: 'user_id' });
UserAnswer.belongsTo(User, { foreignKey: 'user_id' });

OperationLevel.hasMany(UserAnswer, { foreignKey: 'operation_level_id' });
UserAnswer.belongsTo(OperationLevel, { foreignKey: 'operation_level_id' });

export {
    User,
    OperationLevel,
    UserProgress,
    UserAnswer
};
