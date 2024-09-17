// src/services/waterTracking.js
import { WaterTrackingCollection } from '../db/models/waterTracking.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const getAllVolumes = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  try {
    const volumes = await WaterTrackingCollection.find({ userId })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const volumesCount = await WaterTrackingCollection.countDocuments({
      userId,
    });

    const paginationData = calculatePaginationData(volumesCount, perPage, page);

    return {
      data: volumes,
      ...paginationData,
    };
  } catch (error) {
    console.error('Error fetching volumes:', error);
    throw error;
  }
};

export const getVolumeById = async (id, userId) => {
  if (!mongoose.isValidObjectId(id)) {
    console.log('Invalid ID format');
    throw createHttpError(400, 'Invalid ID format');
  }
  console.log('Searching for volume with id:', id, 'and userId:', userId);
  const volume = await WaterTrackingCollection.findOne({ _id: id, userId });
  return volume;
};

export const createVolume = async (payload) => {
  console.log('Payload for creating volume:', payload);
  const volume = await WaterTrackingCollection.create(payload);
  return volume;
};

export const deleteVolume = async (volumeId) => {
  const volume = await WaterTrackingCollection.findOneAndDelete({
    _id: volumeId,
  });

  return volume;
};

export const updateVolume = async (volumeId, payload, userId) => {
  const volume = await WaterTrackingCollection.findByIdAndUpdate(
    { _id: volumeId, userId },
    payload,
    { new: true },
  );
  return volume;
};
// ------------------------вода за месяц-----------------------------------------------------------
export const getWaterConsumptionForMonth = async (userId, year, month) => {
  if (!year || !month || !userId) {
    throw createHttpError(400, 'Year, month, and userId are required');
  }

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 1);

  try {
    const volumes = await WaterTrackingCollection.find({
      userId,
      createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    });

    const totalConsumption = volumes.reduce(
      (sum, volume) => sum + volume.volume,
      0,
    );

    return { year, month, totalConsumption };
  } catch (error) {
    console.error('Error fetching water consumption for month: ', error);
    throw error;
  }
};
// ---------------------------вода за день------------------------------------------------------
export const getWaterConsumptionForDay = async (userId, date) => {
  if (!date || !userId) {
    throw createHttpError(400, 'Date and userId are required');
  }

  const startOfDay = new Date(date);
  // const endOfDay = new Date(date);
  // endOfDay.setDate(startOfDay.getDate() + 1);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(startOfDay.getDate() + 1);

  try {
    const volumes = await WaterTrackingCollection.find({
      userId,
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    const totalConsumption = volumes.reduce(
      (sum, volume) => sum + volume.volume,
      0,
    );
    return { date, totalConsumption };
  } catch (error) {
    console.error('Error fetching water consumption for day:', error);

    return { error: 'Error fetching water consumption for day' };
  }
};
