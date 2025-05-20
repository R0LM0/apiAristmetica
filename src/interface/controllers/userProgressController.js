import updateUserProgressUseCase from '../../use_case/updateUserProgressUseCase.js';

class UserProgressController {
    async update(req, res) {
        try {
            const { user_id, operation_level_id, current_level, score } = req.body;

            await updateUserProgressUseCase.execute({
                user_id,
                operation_level_id,
                current_level,
                score
            });

            res.status(200).json({ message: "Progreso actualizado correctamente" });
        } catch (error) {
            console.error("Error al actualizar progreso:", error);
            res.status(500).json({ message: "Error al actualizar progreso" });
        }
    }
}

export default new UserProgressController();
