import { describe, it, expect, vi, beforeEach } from 'vitest';
import prisma from '../../db/client.js';
import { userGroupService } from './user-group.service.js';

// Mock the prisma client
vi.mock('../../db/client.js', () => ({
  default: {
    userGroup: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('userGroupService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find all user groups', async () => {
    const mockUserGroups = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }];
    prisma.userGroup.findMany.mockResolvedValue(mockUserGroups);

    const userGroups = await userGroupService.findAll();

    expect(prisma.userGroup.findMany).toHaveBeenCalledTimes(1);
    expect(userGroups).toEqual(mockUserGroups);
  });

  it('should find one user group by id', async () => {
    const mockUserGroup = { id: 1, name: 'Admin' };
    prisma.userGroup.findUnique.mockResolvedValue(mockUserGroup);

    const userGroup = await userGroupService.findOne(1);

    expect(prisma.userGroup.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(userGroup).toEqual(mockUserGroup);
  });

  it('should create a new user group', async () => {
    const newGroupData = { name: 'Moderator', description: 'Content moderators' };
    const createdGroup = { id: 3, ...newGroupData };
    prisma.userGroup.create.mockResolvedValue(createdGroup);

    const result = await userGroupService.create(newGroupData);

    expect(prisma.userGroup.create).toHaveBeenCalledWith({ data: newGroupData });
    expect(result).toEqual(createdGroup);
  });

  it('should update a user group', async () => {
    const updateData = { name: 'Super Admin', description: 'All powerful admin' };
    const updatedGroup = { id: 1, ...updateData };
    prisma.userGroup.update.mockResolvedValue(updatedGroup);

    const result = await userGroupService.update(1, updateData);

    expect(prisma.userGroup.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
    expect(result).toEqual(updatedGroup);
  });

  it('should remove a user group', async () => {
    const deletedGroup = { id: 1, name: 'Admin' };
    prisma.userGroup.delete.mockResolvedValue(deletedGroup);

    const result = await userGroupService.remove(1);

    expect(prisma.userGroup.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(deletedGroup);
  });
});
