import UserAnswer from "../database/models/userAnswerModel.js";

class UserAnswerRepository {
    async createAnswer(data) {
        return await UserAnswer.create(data);
    }

    async findByUser(user_id) {
        return await UserAnswer.findAll({
            where: { user_id },
            order: [['answered_at', 'DESC']]
        });
    }

    async findAll() {
        return await UserAnswer.findAll();
    }

    async findByUserAndLevel(user_id, operation_level_id) {
        return await UserAnswer.findAll({
            where: { user_id, operation_level_id },
            order: [['answered_at', 'DESC']]
        });
    }
}

export default new UserAnswerRepository();
