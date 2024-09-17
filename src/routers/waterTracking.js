// src/routers/waterTracking.js

import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import {
  createVolumeSchema,
  updateVolumeSchema,
} from '../validation/waterTracking.js';
import { authenticate } from '../middlewares/authenticate.js';

import { isValidVolumeId } from '../middlewares/isValidId.js';

import {
  getVolumesController,
  getVolumeByIdController,
  createVolumeController,
  deleteVolumeController,
  patchVolumeController,
  getWaterForMonthController,
  getWaterForDayController,
} from '../controllers/waterTracking.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getVolumesController));
router.get('/:volumeId', isValidVolumeId, ctrlWrapper(getVolumeByIdController));
router.post(
  '/',
  validateBody(createVolumeSchema),
  ctrlWrapper(createVolumeController),
);
router.patch(
  '/:volumeId',
  isValidVolumeId,
  validateBody(updateVolumeSchema),
  ctrlWrapper(patchVolumeController),
);
router.delete(
  '/:volumeId',
  isValidVolumeId,
  ctrlWrapper(deleteVolumeController),
);

router.get('/consumption/month', ctrlWrapper(getWaterForMonthController));
router.get('/consumption/day', ctrlWrapper(getWaterForDayController));

export default router;
