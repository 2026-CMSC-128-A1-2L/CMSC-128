import { RequestHandler } from "express";

export const routeUploadFile: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    res.sendStatus(404);
    return;
  }

  // const key = (req.file as any).key
  // const path = `${process.env.R2_PUBLIC_URL}/${key}`

  res.json(req.file);
};
