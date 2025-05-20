import getStatsByOperationUseCase from '../../use_case/getStatsByOperationUseCase.js';


class StatsController {
    async getByUser(req, res) {
        try {
            const user_id = req.user.id;
            const stats = await getStatsByOperationUseCase.execute(user_id);
            res.status(200).json(stats);
        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
            res.status(500).json({ message: "Error al obtener estadísticas" });
        }
    }
}

export default new StatsController();
