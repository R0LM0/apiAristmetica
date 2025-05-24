import operationLevelRepository from '../infrastructure/repositories/operationLevelRepository.js';

class GetAllOperationLevelsUseCase {
    async execute() {
        return await operationLevelRepository.findAll();
    }
}

export default new GetAllOperationLevelsUseCase();
