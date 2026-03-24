import { RequestHandler } from 'express';
import z from 'zod';
import { createTag, CreateTagArguments, deleteTag, getTags, updateTag } from '../services/tag';
import { CreateTagBodySchema, UpdateTagBodySchema } from './schema/tag';

export const routeCreateTag: RequestHandler = async (req, res, next) => {
  const params: CreateTagArguments = CreateTagBodySchema.parse(req.body);
  res.status(201).send({ data: await createTag(params) });
};

export const routeGetTags: RequestHandler = async (req, res, next) => {
  res.status(200).send({ data: await getTags() });
};

// route for updating tads, can update display name, required status, and data type
export const routeUpdateTag: RequestHandler = async (req, res, next) => {
  const tagName = z.string().parse(req.params.tagName);
  const updateData = UpdateTagBodySchema.parse(req.body);

  const updatedTag = await updateTag(tagName, updateData, res.locals.filters ?? {});

  res.status(200).json({ data: updatedTag });
};

export const routeDeleteTag: RequestHandler = async (req, res, next) => {
  const tagName = z.string().parse(req.params.tagName);

  await deleteTag(tagName);

  res.status(200).json({ message: 'Tag deleted successfully' });
};
