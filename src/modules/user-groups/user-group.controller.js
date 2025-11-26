import { userGroupService } from './user-group.service.js';

const findAll = async (req, res) => {
  try {
    const userGroups = await userGroupService.findAll();
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ message: 'Error finding user groups', error });
  }
};

const findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userGroup = await userGroupService.findOne(id);
    if (!userGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    res.status(200).json(userGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error finding user group', error });
  }
};

const create = async (req, res) => {
  try {
    const newUserGroup = await userGroupService.create(req.body);
    res.status(201).json(newUserGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user group', error });
  }
};

const update = async (req, res) => {
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
    res.status(500).json({ message: 'Error updating user group', error });
  }
};

const remove = async (req, res) => {
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
    res.status(500).json({ message: 'Error deleting user group', error });
  }
};

export const userGroupController = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
