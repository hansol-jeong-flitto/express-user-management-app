import { userService } from './user.service.js';

const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error finding users', error });
  }
};

const findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.findOne(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error finding user', error });
  }
};

const create = async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingUser = await userService.findOne(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await userService.update(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingUser = await userService.findOne(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    await userService.remove(id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const userController = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
