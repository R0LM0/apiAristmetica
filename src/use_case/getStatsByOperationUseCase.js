import userAnswerRepository from '../infrastructure/repositories/userAnswerRepository.js';

class GetStatsByOperationUseCase {
    async execute(user_id) {
        const all = await userAnswerRepository.findByUser(user_id);

        const stats = {};

        for (const item of all) {
            const opId = item.operation_level_id;
            if (!stats[opId]) {
                stats[opId] = { total: 0, correct: 0 };
            }
            stats[opId].total += 1;
            if (item.is_correct) stats[opId].correct += 1;
        }

        return stats;
    }
}

export default new GetStatsByOperationUseCase();
