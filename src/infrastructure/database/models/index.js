import User from './user.model.js';
import OperationLevel from './operationLevel.model.js';
import UserProgress from './userProgress.model.js';

// Relaciones
User.hasMany(UserProgress, { foreignKey: 'user_id' });
UserProgress.belongsTo(User, { foreignKey: 'user_id' });

OperationLevel.hasMany(UserProgress, { foreignKey: 'operation_level_id' });
UserProgress.belongsTo(OperationLevel, { foreignKey: 'operation_level_id' });

export {
    User,
    OperationLevel,
    UserProgress
};
