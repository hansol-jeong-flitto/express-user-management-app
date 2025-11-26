import { Router } from 'express';
import { userController } from './user.controller.js';

const router = Router();

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
