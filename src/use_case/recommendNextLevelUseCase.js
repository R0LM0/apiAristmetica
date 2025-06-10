import userProgressRepository from '../infrastructure/repositories/userProgressRepository.js';
import operationLevelRepository from '../infrastructure/repositories/operationLevelRepository.js';

class RecommendNextLevelUseCase {
    async execute(user_id) {
        try {
            // Validar entrada
            if (!user_id) {
                throw new Error('ID de usuario es requerido');
            }

            // Obtener todo el progreso del usuario en una sola consulta
            const allProgress = await userProgressRepository.findByUser(user_id);

            // Obtener todas las operaciones en una sola consulta
            const allOperations = await operationLevelRepository.findAll();

            if (allOperations.length === 0) {
                throw new Error('No hay operaciones disponibles');
            }

            // 🔰 Si no tiene progreso aún, sugerir la primera operación
            if (allProgress.length === 0) {
                return {
                    operation: allOperations[0],
                    current_level: 1,
                    reason: 'Primera operación para el usuario'
                };
            }

            // Crear un mapa para acceso rápido a operaciones
            const operationsMap = new Map(
                allOperations.map(op => [op.id, op])
            );

            // 🔎 Buscar operación con menor nivel o bajo score
            let candidate = null;
            let lowestScore = Infinity;
            let lowestLevel = Infinity;

            for (const progress of allProgress) {
                const { score, current_level, operation_level_id } = progress;

                // Prioridad 1: Si score es bajo (< 60), repetir nivel
                if (score < 60) {
                    const operation = operationsMap.get(operation_level_id);
                    if (operation) {
                        return {
                            operation,
                            current_level: current_level,
                            reason: `Score bajo (${score}) - repetir nivel`
                        };
                    }
                }

                // Prioridad 2: Buscar el menor nivel para avanzar
                if (current_level < lowestLevel) {
                    lowestLevel = current_level;
                    candidate = progress;
                }

                // Prioridad 3: Si hay empate en nivel, elegir el de menor score
                if (current_level === lowestLevel && score < lowestScore) {
                    lowestScore = score;
                    candidate = progress;
                }
            }

            // ✅ Avanzar a siguiente nivel en la operación candidata
            if (candidate) {
                const operation = operationsMap.get(candidate.operation_level_id);
                if (operation) {
                    return {
                        operation,
                        current_level: candidate.current_level + 1,
                        reason: `Avanzando al siguiente nivel (${candidate.current_level + 1})`
                    };
                }
            }

            // Fallback: si algo sale mal, sugerir la primera operación
            return {
                operation: allOperations[0],
                current_level: 1,
                reason: 'Fallback - primera operación'
            };

        } catch (error) {
            console.error('Error en recomendación de nivel:', error.message);
            throw new Error('Error al recomendar el siguiente nivel');
        }
    }
}

export default new RecommendNextLevelUseCase();
