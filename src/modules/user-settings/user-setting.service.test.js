import { describe, it, expect, vi, beforeEach } from 'vitest';
import prisma from '../../db/client.js';
import { userSettingService } from './user-setting.service.js';

// Mock the prisma client for the user model
vi.mock('../../db/client.js', () => ({
  default: {
    userSetting: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('userSettingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // RED: This test will fail because the service or findOne doesn't exist yet
  it('should find one user setting by setting id', async () => {
    const mockSetting = { id: 1, userId: 1, language: 'en', emailNotification: true };
    prisma.userSetting.findUnique.mockResolvedValue(mockSetting);

    const setting = await userSettingService.findOne(1);

    expect(prisma.userSetting.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(setting).toEqual(mockSetting);
  });

  it('should return null if user setting not found by setting id', async () => {
    prisma.userSetting.findUnique.mockResolvedValue(null);

    const setting = await userSettingService.findOne(99);

    expect(prisma.userSetting.findUnique).toHaveBeenCalledWith({ where: { id: 99 } });
    expect(setting).toBeNull();
  });

  // RED: This test will fail because findByUserId doesn't exist yet
  it('should find one user setting by user id', async () => {
    const mockSetting = { id: 1, userId: 1, language: 'en', emailNotification: true };
    prisma.userSetting.findUnique.mockResolvedValue(mockSetting); // findUnique is used for by userId too

    const setting = await userSettingService.findByUserId(1);

    expect(prisma.userSetting.findUnique).toHaveBeenCalledWith({ where: { userId: 1 } });
    expect(setting).toEqual(mockSetting);
  });

  it('should return null if user setting not found by user id', async () => {
    prisma.userSetting.findUnique.mockResolvedValue(null);

    const setting = await userSettingService.findByUserId(99);

    expect(prisma.userSetting.findUnique).toHaveBeenCalledWith({ where: { userId: 99 } });
    expect(setting).toBeNull();
  });

  it('should create a new user setting', async () => {
    const newSettingData = { userId: 2, language: 'ko', emailNotification: false };
    const createdSetting = { id: 2, ...newSettingData };
    prisma.userSetting.create.mockResolvedValue(createdSetting);

    const result = await userSettingService.create(newSettingData);

    expect(prisma.userSetting.create).toHaveBeenCalledWith({ data: newSettingData });
    expect(result).toEqual(createdSetting);
  });

  it('should update a user setting', async () => {
    const updateData = { language: 'fr', emailNotification: true };
    const updatedSetting = { id: 1, userId: 1, language: 'fr', emailNotification: true };
    prisma.userSetting.update.mockResolvedValue(updatedSetting);

    const result = await userSettingService.update(1, updateData);

    expect(prisma.userSetting.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
    expect(result).toEqual(updatedSetting);
  });

  it('should remove a user setting', async () => {
    const deletedSetting = { id: 1, userId: 1 };
    prisma.userSetting.delete.mockResolvedValue(deletedSetting);

    const result = await userSettingService.remove(1);

    expect(prisma.userSetting.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(deletedSetting);
  });
});
