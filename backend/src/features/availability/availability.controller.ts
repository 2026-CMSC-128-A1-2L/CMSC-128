import type { RequestHandler } from 'express';
import { getLandlordAvailability, updateLandlordAvailability } from './availability.service.js';
import assert from 'node:assert';
import { AppError } from '../../error.js';

export const routeGetMyAvailability: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const landlordId = req.user._id;
  const availability = await getLandlordAvailability(landlordId);
  res.status(200).json({ data: availability });
};

export const routeUpdateMyAvailability: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const landlordId = req.user._id;
  const { grid } = req.body;

  if (!grid || !Array.isArray(grid)) {
    throw new AppError(400, 'Invalid availability grid.');
  }

  const updated = await updateLandlordAvailability(landlordId, grid);
  res.status(200).json({ data: updated });
};
