import { describe, it, expect, vi, beforeEach } from 'vitest';
import prisma from '../../db/client.js'; // Note the path change for modules
import { userService } from './user.service.js';

// Mock the prisma client for the user model
vi.mock('../../db/client.js', () => ({
  default: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // RED: This test will fail because userService or userService.findAll doesn't exist yet.
  it('should find all users', async () => {
    const mockUsers = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await userService.findAll();

    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUsers);
  });

  it('should find one user by id', async () => {
    const mockUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const user = await userService.findOne(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(user).toEqual(mockUser);
  });

  it('should return null if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const user = await userService.findOne(99); // Non-existent ID

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 99 } });
    expect(user).toBeNull();
  });

  it('should create a new user', async () => {
    const newUserData = {
      email: 'bob@example.com',
      name: 'Bob',
      password: 'password123', // Not hashed for now
      userGroupId: 1,
    };
    const createdUser = { id: 2, ...newUserData };
    prisma.user.create.mockResolvedValue(createdUser);

    const result = await userService.create(newUserData);

    expect(prisma.user.create).toHaveBeenCalledWith({ data: newUserData });
    expect(result).toEqual(createdUser);
  });

  it('should update a user', async () => {
    const updateData = { name: 'Bobby' };
    const updatedUser = { id: 1, email: 'bob@example.com', name: 'Bobby', password: 'password123', userGroupId: 1 };
    prisma.user.update.mockResolvedValue(updatedUser);

    const result = await userService.update(1, updateData);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
    expect(result).toEqual(updatedUser);
  });

  it('should remove a user', async () => {
    const deletedUser = { id: 1, name: 'Bobby' };
    prisma.user.delete.mockResolvedValue(deletedUser);

    const result = await userService.remove(1);

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(deletedUser);
  });
});
