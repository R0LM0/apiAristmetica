import OperationLevel from "../database/models/operationLevelModel.js";

class OperationLevelRepository {
    async findAll() {
        return await OperationLevel.findAll();
    }

    async findById(id) {
        return await OperationLevel.findByPk(id);
    }

    async findByCode(code) {
        return await OperationLevel.findOne({ where: { code } });
    }

    async createLevel(levelData) {
        return await OperationLevel.create(levelData);
    }
}

export default new OperationLevelRepository();
