import type { RequestHandler } from 'express';
import assert from 'node:assert';

export const inviteFilter: RequestHandler = (req, res, next) => {
  assert.ok(req.user);
  if (req.user.userType === 'Manager') {
    res.locals = { email: { $in: req.user.emails } };
  } else if (req.user.userType === 'Landlord') {
    res.locals = { landlordId: req.user._id };
  }
  next();
};

export const isManagerOnly: RequestHandler = (req, _res, next) => {
  assert.ok(req.user);
  if (req.user.userType !== 'Manager') return;
  next();
};
