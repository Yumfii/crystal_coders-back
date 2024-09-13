// src/routers/waterTracking.js

import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import {
  createVolumeSchema,
  updateVolumeSchema,
} from '../validation/waterTracking.js';
import { authenticate } from '../middlewares/authenticate.js';

import { isValidId } from '../middlewares/isValidId.js';

import {
  getVolumesController,
  getVolumeByIdController,
  createVolumeController,
  deleteVolumeController,
  patchVolumeController,
} from '../controllers/waterTracking.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getVolumesController));
router.get('/:volumeId', isValidId, ctrlWrapper(getVolumeByIdController));
router.post(
  '/',
  validateBody(createVolumeSchema),
  ctrlWrapper(createVolumeController),
);
router.patch(
  '/:volumeId',
  isValidId,
  validateBody(updateVolumeSchema),
  ctrlWrapper(patchVolumeController),
);
router.delete('/:volumeId', isValidId, ctrlWrapper(deleteVolumeController));

export default router;
