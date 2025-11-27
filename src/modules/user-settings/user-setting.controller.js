import { userSettingService } from './user-setting.service.js';

const findOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const setting = await userSettingService.findOne(id);
    if (!setting) {
      return res.status(404).json({ message: 'User setting not found' });
    }
    res.status(200).json(setting);
  } catch (error) {
    next(error);
  }
};

const findByUserId = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const setting = await userSettingService.findByUserId(userId);
    if (!setting) {
      return res.status(404).json({ message: 'User setting not found for this user' });
    }
    res.status(200).json(setting);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newSetting = await userSettingService.create(req.body);
    res.status(201).json(newSetting);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingSetting = await userSettingService.findOne(id);
    if (!existingSetting) {
      return res.status(404).json({ message: 'User setting not found' });
    }
    const updatedSetting = await userSettingService.update(id, req.body);
    res.status(200).json(updatedSetting);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingSetting = await userSettingService.findOne(id);
    if (!existingSetting) {
      return res.status(404).json({ message: 'User setting not found' });
    }
    await userSettingService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const userSettingController = {
  findOne,
  findByUserId,
  create,
  update,
  remove,
};
