import getAllOperationLevelsUseCase from '../../use_case/getAllOperationLevelsUseCase.js';

class OperationLevelController {
    async list(req, res) {
        try {
            const levels = await getAllOperationLevelsUseCase.execute();
            res.status(200).json(levels);
        } catch (error) {
            console.error("Error al listar niveles:", error);
            res.status(500).json({ message: "Error al obtener niveles" });
        }
    }
}

export default new OperationLevelController();
