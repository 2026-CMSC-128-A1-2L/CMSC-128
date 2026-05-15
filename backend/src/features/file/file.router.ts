import { Router } from "express";

const router = Router();

import multer from "multer";
import multerS3 from "multer-s3";

import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import { isLoggedIn } from "../../middleware.js";
import { routeUploadFile, routeDownloadFile } from "./file.controller.js";

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

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.R2_BUCKET_NAME,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueSuffix = `${Date.now().toString()}-${Math.round(Math.random() * 1e9).toString()}`;
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
});

// Files
router.post("/", isLoggedIn, upload.single("file"), routeUploadFile);
router.get("/download", routeDownloadFile);

export default router;
