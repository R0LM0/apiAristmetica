import express from 'express';
import userProgressController from '../interface/controllers/userProgressController.js'; // 🔧 FIXED
import userAnswerController from '../interface/controllers/userAnswerController.js';
import operationLevelController from '../interface/controllers/operationLevelController.js';

const router = express.Router();

router.post('/user-progress', userProgressController.update);
router.post('/user-answers', userAnswerController.save);
router.get('/operation-levels', operationLevelController.list);
router.get('/user-progress/:user_id', userProgressController.getByUser);

export default router;
