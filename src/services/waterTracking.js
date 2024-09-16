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

export const getWaterConsumptionForDay = async (userId, date) => {
  console.log(
    'Fetching water consumption for userId:',
    userId,
    'and date:',
    date,
  );

  const waterConsumption = await WaterTrackingCollection.find({
    userId,
    date: {
      $gte: new Date(date),
      $lt: new Date(date).setHours(23, 59, 59, 999),
    },
  });
  console.log('day water :>> ', waterConsumption);
  return { date, waterConsumption };
};

export const getWaterConsumptionForMonth = async (userId, year, month) => {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  const waterConsumption = await WaterTrackingCollection.find({
    userId,
    date: { $gte: startOfMonth, $lt: endOfMonth },
  });

  return waterConsumption;
};
