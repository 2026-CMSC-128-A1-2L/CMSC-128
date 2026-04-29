import type { RequestHandler } from 'express';
import { CreateTagBodySchema, UpdateTagBodySchema } from 'shared';
import z from 'zod';
import {
  type CreateTagArguments,
  createTag,
  getTags,
  updateTag,
  deleteTag,
  enrichTags,
} from './tag.service';

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

// POST /api/tags/enrich
//
// Accepts a record of { [tagName]: value } and returns enriched tag objects
// with displayName, dataType, and the provided value for each known tag.
export const routeEnrichTags: RequestHandler = async (req, res, next) => {
  const tags = req.body as Record<string, string | number | boolean>;
  res.status(200).json({ data: await enrichTags(tags) });
};
