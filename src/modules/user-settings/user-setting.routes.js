import { Router } from 'express';
import { userSettingController } from './user-setting.controller.js';

const router = Router();

router.get('/:id', userSettingController.findOne);
router.get('/user/:userId', userSettingController.findByUserId);
router.post('/', userSettingController.create);
router.put('/:id', userSettingController.update);
router.delete('/:id', userSettingController.remove);

export default router;
