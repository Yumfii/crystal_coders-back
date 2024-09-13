// src/services/waterTracking.js
import { WaterTrackingCollection } from '../db/models/waterTracking.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllVolumes = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const volumesQuery = WaterTrackingCollection.find({ userId });
  const volumesCount = await WaterTrackingCollection.find({ userId })
    .merge(volumesQuery)
    .countDocuments();

  const volumes = await volumesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(volumesCount, perPage, page);

  return {
    data: volumes,
    ...paginationData,
  };
};

export const getVolumeById = async (id, userId) => {
  const volume = await WaterTrackingCollection.findOne({ _id: id, userId });
  return volume;
};

export const createVolume = async (payload) => {
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
