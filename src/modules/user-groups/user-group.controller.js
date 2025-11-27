import { userGroupService } from './user-group.service.js';

const findAll = async (req, res, next) => {
  try {
    const userGroups = await userGroupService.findAll();
    res.status(200).json(userGroups);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userGroup = await userGroupService.findOne(id);
    if (!userGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    res.status(200).json(userGroup);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newUserGroup = await userGroupService.create(req.body);
    res.status(201).json(newUserGroup);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // Check if group exists before trying to update
    const existingGroup = await userGroupService.findOne(id);
    if (!existingGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    const updatedUserGroup = await userGroupService.update(id, req.body);
    res.status(200).json(updatedUserGroup);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // Check if group exists before trying to delete
    const existingGroup = await userGroupService.findOne(id);
    if (!existingGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    await userGroupService.remove(id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
};

export const userGroupController = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
