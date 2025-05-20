import userProgressRepository from '../infrastructure/repositories/userProgressRepository.js';

class GetUserProgressUseCase {
    async execute(user_id) {
        return await userProgressRepository.findByUser(user_id);
    }
}

export default new GetUserProgressUseCase();
