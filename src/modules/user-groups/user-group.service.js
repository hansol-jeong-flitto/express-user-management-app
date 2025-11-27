import prisma from '../../db/client.js';

const findAll = async () => {
  return prisma.userGroup.findMany();
};

const findOne = async (id) => {
  return prisma.userGroup.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return prisma.userGroup.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

const update = async (id, data) => {
  return prisma.userGroup.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

const remove = async (id) => {
  return prisma.userGroup.delete({
    where: { id },
  });
};

export const userGroupService = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
