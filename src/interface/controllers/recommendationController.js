import recommendNextLevelUseCase from '../../use_case/recommendNextLevelUseCase.js';

class RecommendationController {
    async getNextLevel(req, res) {
        try {
            const user_id = req.user.id; // ✅ tomado del JWT
            const result = await recommendNextLevelUseCase.execute(user_id);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error recomendando siguiente nivel:", error);
            res.status(500).json({ message: "Error al recomendar nivel" });
        }
    }
}

export default new RecommendationController();
