import userAnswerRepository from '../infrastructure/repositories/userAnswerRepository.js';

class CreateUserAnswerUseCase {
    async execute({ user_id, operation_level_id, question, given_answer, is_correct }) {
        return await userAnswerRepository.createAnswer({
            user_id,
            operation_level_id,
            question,
            given_answer,
            is_correct,
            answered_at: new Date()
        });
    }
}

export default new CreateUserAnswerUseCase();
