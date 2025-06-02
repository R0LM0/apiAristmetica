import userProgressRepository from '../infrastructure/repositories/userProgressRepository.js';

class UpdateUserProgressUseCase {
    async execute({ user_id, operation_level_id, current_level, score }) {
        const existing = await userProgressRepository.findByUserAndLevel(user_id, operation_level_id);

        if (existing) {
            await userProgressRepository.updateProgress(user_id, operation_level_id, {
                current_level,
                score,
                updated_at: new Date()
            });
        } else {
            await userProgressRepository.create({
                user_id,
                operation_level_id,
                current_level,
                score,
                updated_at: new Date()
            });
        }
    }
}

export default new UpdateUserProgressUseCase();
