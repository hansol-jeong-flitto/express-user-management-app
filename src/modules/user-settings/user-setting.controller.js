import { userSettingService } from './user-setting.service.js';

const findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const setting = await userSettingService.findOne(id);
    if (!setting) {
      return res.status(404).json({ message: 'User setting not found' });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Error finding user setting', error });
  }
};

const findByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const setting = await userSettingService.findByUserId(userId);
    if (!setting) {
      return res.status(404).json({ message: 'User setting not found for this user' });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Error finding user setting by user ID', error });
  }
};

const create = async (req, res) => {
  try {
    const newSetting = await userSettingService.create(req.body);
    res.status(201).json(newSetting);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user setting', error });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingSetting = await userSettingService.findOne(id);
    if (!existingSetting) {
      return res.status(404).json({ message: 'User setting not found' });
    }
    const updatedSetting = await userSettingService.update(id, req.body);
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user setting', error });
  }
};

const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingSetting = await userSettingService.findOne(id);
    if (!existingSetting) {
      return res.status(404).json({ message: 'User setting not found' });
    }
    await userSettingService.remove(id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user setting', error });
  }
};

export const userSettingController = {
  findOne,
  findByUserId,
  create,
  update,
  remove,
};
