import prisma from '../../db/client.js';

const findOne = async (id) => {
  return prisma.userSetting.findUnique({
    where: { id },
  });
};

const findByUserId = async (userId) => {
  return prisma.userSetting.findUnique({
    where: { userId },
  });
};

const create = async (data) => {
  return prisma.userSetting.create({
    data: data,
  });
};

const update = async (id, data) => {
  return prisma.userSetting.update({
    where: { id },
    data: data,
  });
};

const remove = async (id) => {
  return prisma.userSetting.delete({
    where: { id },
  });
};

export const userSettingService = {
  findOne,
  findByUserId,
  create,
  update,
  remove,
};
