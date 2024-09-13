// src/db/models/waterTracking.js
import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const waterTrackingSchema = new Schema(
  {
    volume: {
      type: String,
      required: true,
      default: '250',
    },

    volumeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Volume',
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterTrackingCollection = model('volumes', waterTrackingSchema);
