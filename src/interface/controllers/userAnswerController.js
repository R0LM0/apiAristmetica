import createUserAnswerUseCase from '../../use_case/createUserAnswerUseCase.js';

class UserAnswerController {
    async save(req, res) {
        try {
            const { user_id, operation_level_id, question, given_answer, is_correct } = req.body;

            const saved = await createUserAnswerUseCase.execute({
                user_id,
                operation_level_id,
                question,
                given_answer,
                is_correct
            });

            res.status(201).json(saved);
        } catch (error) {
            console.error("Error al guardar respuesta:", error);
            res.status(500).json({ message: "Error al guardar respuesta" });
        }
    }
}

export default new UserAnswerController();
