import prisma from '../../db/client.js';

const findAll = async () => {
  return prisma.user.findMany();
};

const findOne = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return prisma.user.create({
    data: data,
  });
};

const update = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data: data,
  });
};

const remove = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const userService = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
