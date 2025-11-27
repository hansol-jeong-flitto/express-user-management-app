import { Router } from 'express';
import { userGroupController } from './user-group.controller.js';
import validate from '../../middlewares/validation.middleware.js';
import { CreateUserGroupSchema } from './dto/create-user-group.dto.js';
import { UpdateUserGroupSchema } from './dto/update-user-group.dto.js';

const router = Router();

router.get('/', userGroupController.findAll);
router.get('/:id', userGroupController.findOne);
router.post('/', validate(CreateUserGroupSchema), userGroupController.create);
router.patch('/:id', validate(UpdateUserGroupSchema), userGroupController.update);
router.delete('/:id', userGroupController.remove);

export default router;
