import { userService } from './user.service.js';

const findAll = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.findOne(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingUser = await userService.findOne(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await userService.update(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingUser = await userService.findOne(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    await userService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const userController = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
