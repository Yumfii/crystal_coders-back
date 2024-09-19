// src/db/models/waterTracking.js

import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const waterTrackingSchema = new Schema(
  {
    volume: {
      type: Number,
      required: true,
      default: 250,
    },
    time: {
      type: String,
      required: true,
    },

    volumeId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterTrackingCollection = model('volumes', waterTrackingSchema);
