import userProgressRepository from '../infrastructure/repositories/userProgressRepository.js';
import operationLevelRepository from '../infrastructure/repositories/operationLevelRepository.js';

class RecommendNextLevelUseCase {
    async execute(user_id) {
        const allProgress = await userProgressRepository.findByUser(user_id);
        const allOperations = await operationLevelRepository.findAll();

        // 🔰 Si no tiene progreso aún, sugerir la primera operación
        if (allProgress.length === 0) {
            return {
                operation: allOperations[0],
                current_level: 1
            };
        }

        // 🔎 Buscar operación con menor nivel o bajo score
        let candidate = null;

        for (const progress of allProgress) {
            const { score, current_level } = progress;

            // Si score es bajo, repetir nivel
            if (score < 60) {
                return {
                    operation: await operationLevelRepository.findById(progress.operation_level_id),
                    current_level: current_level
                };
            }

            // Sino, ir evaluando cuál es el menor nivel para avanzar
            if (!candidate || current_level < candidate.current_level) {
                candidate = progress;
            }
        }

        // ✅ Avanzar a siguiente nivel en esa operación
        return {
            operation: await operationLevelRepository.findById(candidate.operation_level_id),
            current_level: candidate.current_level + 1
        };
    }
}

export default new RecommendNextLevelUseCase();
