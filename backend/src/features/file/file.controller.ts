import type { RequestHandler } from 'express';
import { File } from './file.model';
import assert from 'node:assert';

export const routeUploadFile: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    res.sendStatus(404);
    return;
  }

  // Already checked in middleware, should exist at this point.
  assert.ok(req.user, 'User should exist/have an account.');

  const newFile = new File({
    key: (req.file as any).key,
    userId: req.user._id,
    filename: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype,
    contentType: (req.file as any).contentType,
  });

  res.json(await newFile.save());
};
