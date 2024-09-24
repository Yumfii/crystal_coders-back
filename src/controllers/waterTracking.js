// src/controllers/waterTracking.js

import createHttpError from 'http-errors';
import {
  getAllVolumes,
  getVolumeById,
  createVolume,
  deleteVolume,
  updateVolume,
  getWaterConsumptionForMonth,
  getWaterConsumptionForDay,
  getRemainingWaterConsumption,
} from '../services/waterTracking.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getVolumesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const userId = req.user._id;
  const volumes = await getAllVolumes({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });
  console.log('Found volumes:', volumes);
  res.json({
    status: 200,
    message: 'Successfully found volumes!',
    data: volumes,
  });
};

export const getVolumeByIdController = async (req, res, next) => {
  const { volumeId } = req.params;
  const userId = req.user._id;

  try {
    const volume = await getVolumeById(volumeId, userId);
    if (!volume) {
      throw createHttpError(404, 'Volume not found');
    }
    res.json({
      status: 200,
      message: `Successfully found volume with Id ${volumeId} !`,
      data: volume,
    });
  } catch (err) {
    console.error('Error:', err.message);
    next(err);
  }
};

export const createVolumeController = async (req, res, next) => {
  const { volume, time } = req.body;
  const userId = req.user._id;

  if (!volume || !time) {
    return next(createHttpError(400, 'Required fields are missing'));
  }

  try {
    const createdVolume = await createVolume({
      volume,
      time,
      userId,
    });

    res.status(201).json({
      status: 201,
      message: 'Volume created successfully!',
      data: createdVolume,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteVolumeController = async (req, res, next) => {
  const { volumeId } = req.params;
  const userId = req.user._id;

  const volume = await deleteVolume(volumeId, userId);

  if (!volume) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchVolumeController = async (req, res, next) => {
  const { volumeId } = req.params;

  const result = await updateVolume(volumeId, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const getWaterForMonthController = async (req, res) => {
  const { userId, year, month } = req.query;

  try {
    const waterConsumption = await getWaterConsumptionForMonth(
      userId,
      year,
      month,
    );
    res.status(200).json(waterConsumption);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// export const getWaterForDayController = async (req, res) => {
//   const { userId, date } = req.query;
//   console.log(`Received request for userId ${userId} on date ${date}`);
//   try {
//     const waterConsumption = await getWaterConsumptionForDay(userId, date);
//     res.status(200).json(waterConsumption);
//   } catch (error) {
//     console.error('Error fetching water consumption:', error.message);

//     res.status(500).json({ error: error });
//   }
// };

export const getWaterForDayController = async (req, res) => {
  try {
    const { userId, date } = req.query;
    console.log(`Received request for userId ${userId} on date ${date}`);

    const waterConsumption = await getWaterConsumptionForDay(userId, date);

    res.status(200).json(waterConsumption);
  } catch (error) {
    console.error('Error fetching water consumption:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getWaterRemainingPercentageController = async (req, res) => {
  const { _id: userId } = req.user;
  const { date } = req.query;

  const dailyNorm = 2000;

  try {
    const { totalConsumption, remainingVolume } =
      await getRemainingWaterConsumption(userId, date, dailyNorm);

    const consumedPercentage = ((totalConsumption / dailyNorm) * 100).toFixed(
      2,
    );
    const remainingPercentage = ((remainingVolume / dailyNorm) * 100).toFixed(
      2,
    );

    res.json({
      date,
      totalConsumption,
      remainingVolume,
      consumedPercentage,
      remainingPercentage,
      dailyNorm,
    });
  } catch (error) {
    console.error('Error fetching remaining water percentage:', error.message);
    res.status(500).json({ error: error.message });
  }
};
