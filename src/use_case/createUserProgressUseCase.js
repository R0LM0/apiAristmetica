import userProgressRepository from '../infrastructure/repositories/userProgressRepository.js';

class CreateUserProgressUseCase {
    async execute({ user_id, operation_level_id, current_level, score }) {
        // Verificar si ya existe progreso para este usuario y nivel
        const existingProgress = await userProgressRepository.findByUserAndLevel(user_id, operation_level_id);

        if (existingProgress) {
            throw new Error('Ya existe progreso para este usuario en este nivel');
        }

        // Crear nuevo progreso inicial
        return await userProgressRepository.create({
            user_id,
            operation_level_id,
            current_level: current_level || 1,
            score: score || 0,
            created_at: new Date(),
            updated_at: new Date()
        });
    }
}

export default new CreateUserProgressUseCase();
