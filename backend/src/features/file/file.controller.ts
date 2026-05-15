import type { RequestHandler } from "express";
import { File } from "./file.model.js";
import assert from "node:assert";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (
  !process.env.R2_ENDPOINT ||
  !process.env.R2_ACCESS_KEY ||
  !process.env.R2_SECRET ||
  !process.env.R2_BUCKET_NAME
)
  throw new Error("R2 credentials not defined in environment.");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET,
  },
});

export const routeUploadFile: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    res.sendStatus(404);
    return;
  }

  // Already checked in middleware, should exist at this point.
  assert.ok(req.user, "User should exist/have an account.");

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

export const routeDownloadFile: RequestHandler = async (req, res, next) => {
  const filePath = req.query.path as string;
  if (!filePath) {
    res.status(400).json({ error: "File path is required" });
    return;
  }

  const file = await File.findOne({ key: filePath });
  if (!file) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filePath,
      ResponseContentDisposition: `attachment; filename="${file.filename}"`,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.json({
      url: signedUrl,
      filename: file.filename,
      mimeType: file.mimeType,
    });
  } catch (error) {
    next(error);
  }
};
