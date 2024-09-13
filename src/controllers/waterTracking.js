// src/controllers/waterTracking.js

import createHttpError from 'http-errors';
import {
  getAllVolumes,
  getVolumeById,
  createVolume,
  deleteVolume,
  updateVolume,
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
  const volume = await getVolumeById(volumeId, userId);
  if (!volume) {
    throw createHttpError(404, ' not found');
  }

  res.json({
    status: 200,
    message: `Successfully found volume with id ${volumeId}!`,
    data: volume,
  });
};

export const createVolumeController = async (req, res, next) => {
  const { volume } = req.body;
  const userId = req.user._id;

  if (!volume) {
    return next(createHttpError(400, 'Missing required fields'));
  }

  try {
    const volume = await createVolume({
      volume,
      userId,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a volume!',
      data: volume,
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
