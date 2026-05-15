import type { RequestHandler } from 'express';
import { File } from './file.model.js';
import assert from 'node:assert';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';

type R2UploadedFile = Express.Multer.File & {
  key: string;
  contentType?: string;
};

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY ?? '',
    secretAccessKey: process.env.R2_SECRET ?? '',
  },
});

const getFallbackKeys = (key: string) => {
  const normalizedKey = key.replace(/^\/+/, '');
  const fallbackKey = normalizedKey.startsWith('atlas/')
    ? normalizedKey.replace(/^atlas\//, '')
    : `atlas/${normalizedKey}`;

  return [...new Set([normalizedKey, fallbackKey])];
};

export const routeUploadFile: RequestHandler = async (req, res) => {
  if (!req.file) {
    res.sendStatus(404);
    return;
  }

  // Already checked in middleware, should exist at this point.
  assert.ok(req.user, 'User should exist/have an account.');

  const uploadedFile = req.file as R2UploadedFile;

  const newFile = new File({
    key: uploadedFile.key,
    userId: req.user._id,
    filename: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype,
    contentType: uploadedFile.contentType,
  });

  res.json(await newFile.save());
};

export const routeGetPublicFile: RequestHandler = async (req, res) => {
  const key = typeof req.query.key === 'string' ? req.query.key : undefined;
  if (!key) {
    res.status(400).send({ error: { message: 'File key is required.' } });
    return;
  }

  let lastError: unknown;

  for (const candidateKey of getFallbackKeys(key)) {
    try {
      const object = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: candidateKey,
        }),
      );

      if (!object.Body) {
        res.sendStatus(404);
        return;
      }

      if (object.ContentType) res.type(object.ContentType);
      if (object.ContentLength) res.setHeader('Content-Length', object.ContentLength.toString());
      res.setHeader('Cache-Control', 'public, max-age=86400');

      if (object.Body instanceof Readable) {
        object.Body.pipe(res);
        return;
      }

      const body = object.Body as { transformToByteArray?: () => Promise<Uint8Array> };
      const bytes = await body.transformToByteArray?.();
      if (bytes) {
        res.send(Buffer.from(bytes));
        return;
      }

      res.sendStatus(500);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  console.error('Failed to fetch R2 file:', lastError);
  res.sendStatus(404);
};
