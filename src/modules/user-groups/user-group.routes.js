import { Router } from 'express';
import { userGroupController } from './user-group.controller.js';

const router = Router();

router.get('/', userGroupController.findAll);
router.get('/:id', userGroupController.findOne);
router.post('/', userGroupController.create);
router.patch('/:id', userGroupController.update);
router.delete('/:id', userGroupController.remove);

export default router;
