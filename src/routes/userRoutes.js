import express from 'express';
import userProgressController from '../interface/controllers/userProgressController.js'; // 🔧 FIXED
import userAnswerController from '../interface/controllers/userAnswerController.js';
import operationLevelController from '../interface/controllers/operationLevelController.js';
import recommendationController from '../interface/controllers/recommendationController.js';
import statsController from '../interface/controllers/statsController.js';

const router = express.Router();

router.post('/user-progress', userProgressController.update);
router.post('/user-answers', userAnswerController.save);
router.get('/operation-levels', operationLevelController.list);
router.get('/user-progress/:user_id', userProgressController.getByUser);
router.get('/recommend-next-level', recommendationController.getNextLevel);
router.get('/user-stats', statsController.getByUser);

export default router;
