import { Router } from 'express';
import { userController } from './user.controller.js';
import validate from '../../middlewares/validation.middleware.js';
import { CreateUserSchema } from './dto/create-user.dto.js';
import { UpdateUserSchema } from './dto/update-user.dto.js';

const router = Router();

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/', validate(CreateUserSchema), userController.create);
router.patch('/:id', validate(UpdateUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
