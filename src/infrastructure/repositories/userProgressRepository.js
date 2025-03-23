import UserProgress from "../database/models/userProgressModel.js";

class UserProgressRepository {
    async createProgress(data) {
        return await UserProgress.create(data);
    }

    async updateProgress(user_id, operation_level_id, updatedData) {
        return await UserProgress.update(updatedData, {
            where: { user_id, operation_level_id }
        });
    }

    async findByUserAndLevel(user_id, operation_level_id) {
        return await UserProgress.findOne({
            where: { user_id, operation_level_id }
        });
    }

    async findByUser(user_id) {
        return await UserProgress.findAll({ where: { user_id } });
    }

    async findAll() {
        return await UserProgress.findAll();
    }
}

export default new UserProgressRepository();
