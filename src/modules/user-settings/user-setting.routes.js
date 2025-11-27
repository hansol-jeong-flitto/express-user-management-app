import { Router } from 'express';
import { userSettingController } from './user-setting.controller.js';
import validate from '../../middlewares/validation.middleware.js';
import { CreateUserSettingSchema } from './dto/create-user-setting.dto.js';
import { UpdateUserSettingSchema } from './dto/update-user-setting.dto.js';

const router = Router();

router.get('/:id', userSettingController.findOne);
router.get('/user/:userId', userSettingController.findByUserId);
router.post('/', validate(CreateUserSettingSchema), userSettingController.create);
router.put('/:id', validate(UpdateUserSettingSchema), userSettingController.update); // Use PUT for update as per NestJS example
router.delete('/:id', userSettingController.remove);

export default router;
