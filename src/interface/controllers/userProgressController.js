//src/interface/controllers/userProgressController.js

import updateUserProgressUseCase from '../../use_case/updateUserProgressUseCase.js';
import getUserProgressUseCase from '../../use_case/getUserProgressUseCase.js';

class userProgressController {
    async update(req, res) {
        try {
            const user_id = req.user.id; // 🔥 obtenido del JWT
            const { operation_level_id, current_level, score } = req.body;

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

    async getByUser(req, res) {
        try {
            const { user_id } = req.params;

            const progress = await getUserProgressUseCase.execute(user_id);

            res.status(200).json(progress);
        } catch (error) {
            console.error("Error al obtener progreso del usuario:", error);
            res.status(500).json({ message: "Error al obtener progreso" });
        }
    }
}

export default new userProgressController();
